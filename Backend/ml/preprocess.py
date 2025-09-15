import requests
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import warnings
from datetime import datetime

warnings.filterwarnings('ignore')

# ---------------------------
# 1. Fetch internships from Node.js API and flatten nested data
# ---------------------------
try:
    url = "http://localhost:5000/all-internship"
    data = requests.get(url, timeout=10).json()
    df = pd.json_normalize(data)
except requests.exceptions.RequestException as e:
    print(f"Error fetching data: {e}")
    df = pd.DataFrame()

if not df.empty:
    # Flatten fields
    df["skills"] = df["qualification.skills"].apply(lambda x: " ".join(x) if isinstance(x, list) else "")
    df["certificates"] = df["qualification.certificates"].apply(lambda x: " ".join(x) if isinstance(x, list) else "")
    
    # Handle languages
    if "qualification.languages" in df.columns:
        df["languages"] = df["qualification.languages"].apply(lambda x: " ".join(x) if isinstance(x, list) else "")
    else:
        df["languages"] = ""
    
    # Handle location fields
    df["location_state"] = df["location.state"].fillna("")
    df["location_district"] = df["location.district"].fillna("")
    
    df["sector"] = df["sector"].fillna("")
    df["title"] = df["title"].fillna("")
    df["field"] = df["field"].fillna("")
    df["duration"] = df["duration"].fillna("")
    df["stipend"] = df["stipend"].fillna(0).astype(float)
    
    if 'total_applied' not in df.columns:
        df['total_applied'] = 0.0
    df["total_applied"] = df["total_applied"].astype(float)
    
    # Recency feature
    if 'posted_date' in df.columns:
        df['posted_date'] = pd.to_datetime(df['posted_date'], errors='coerce')
    else:
        df['posted_date'] = pd.to_datetime(datetime.now()) - pd.to_timedelta(np.random.randint(0, 30, size=len(df)), unit='D')

# ---------------------------
# 2. Encode all features
# ---------------------------
def encode_features(df):
    if df.empty:
        return None, None, None, None
    
    # OneHotEncoder for Sector
    encoder = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
    sector_encoded = encoder.fit_transform(df[["sector"]])
    sector_df = pd.DataFrame(sector_encoded, columns=encoder.get_feature_names_out(["sector"]))

    # TF-IDF Vectorizer for text features
    vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
    text_data = df["skills"] + " " + df["title"] + " " + df["field"] + " " + df["languages"] + " " + df["location_state"] + " " + df["location_district"]
    skills_encoded = vectorizer.fit_transform(text_data).toarray()
    skills_df = pd.DataFrame(skills_encoded, columns=vectorizer.get_feature_names_out())

    return encoder, vectorizer, sector_df, skills_df

if not df.empty:
    encoder, vectorizer, sector_df, skills_df = encode_features(df)
else:
    print("DataFrame is empty. Cannot perform encoding.")
    exit()

# ---------------------------
# 3. Recommendation Function with Normalized Scoring and Threshold
# ---------------------------
def recommend_internships(df, user_profile, top_n=5, min_threshold=0.0, min_skill_threshold=0.2):
    """
    Recommends internships based on a user's profile.
    """
    user_skills = [s.strip().lower() for s in user_profile.get("Skills", [])]
    user_languages = [s.strip().lower() for s in user_profile.get("Languages", [])]
    user_preferred_location_state = user_profile.get("Preferred_location_state", "").lower()
    user_preferred_location_district = user_profile.get("Preferred_location_district", "").lower()
    user_preferred_type = user_profile.get("Preferred_type", "").lower()
    
    # Step 1: Apply hard location filter
    filtered_df = df.copy()
    if user_preferred_location_state and user_preferred_location_district:
        filtered_df = filtered_df[
            (filtered_df["location_state"].str.lower().str.contains(user_preferred_location_state)) |
            (filtered_df["location_district"].str.lower().str.contains(user_preferred_location_district))
        ]

    if filtered_df.empty:
        print("No internships found for the specified location.")
        return pd.DataFrame()

    filtered_indices = filtered_df.index
    
    # Step 2: Calculate similarities
    user_text = " ".join(user_skills) + " " + " ".join(user_languages) + " " + user_preferred_location_state + " " + user_preferred_location_district
    user_vector = vectorizer.transform([user_text]).toarray()
    
    cosine_sim = cosine_similarity(user_vector, skills_df.loc[filtered_indices])[0]
    
    try:
        user_type_encoded = encoder.transform([[user_preferred_type.capitalize()]]).flatten()
    except ValueError:
        user_type_encoded = np.zeros(len(encoder.categories_[0]))
    
    sector_sim = np.dot(sector_df.loc[filtered_indices].values, user_type_encoded)
    
    # Step 3: Apply the skill-based threshold
    relevant_indices_by_skill = filtered_indices[cosine_sim > min_skill_threshold]
    
    if relevant_indices_by_skill.empty:
        print(f"No internships found with a skill match above the threshold of {min_skill_threshold * 100}%.")
        return pd.DataFrame()

    # Step 4: Calculate the combined score for the remaining internships
    relevant_cosine_sim = cosine_sim[cosine_sim > min_skill_threshold]
    relevant_sector_sim = sector_sim[cosine_sim > min_skill_threshold]
    
    text_weight = 0.8
    sector_weight = 0.2
    combined_score = (text_weight * relevant_cosine_sim) + (sector_weight * relevant_sector_sim)

    # Step 5: Increase the "perfect match" bonus
    perfect_match_bonus = np.zeros(len(relevant_indices_by_skill))
    for i, idx in enumerate(relevant_indices_by_skill):
        internship_skills = set(df.loc[idx, "skills"].lower().split())
        
        # A stronger bonus (0.2) for each matching skill
        if any(skill in internship_skills for skill in user_skills):
            num_matching_skills = len(set(user_skills).intersection(internship_skills))
            perfect_match_bonus[i] = 0.2 * num_matching_skills

    combined_score += perfect_match_bonus
    
    # Step 6: Increase the recency bonus
    if 'posted_date' in df.columns:
        now = pd.to_datetime(datetime.now())
        recency_decay_rate = 10
        days_since_posted = (now - df.loc[relevant_indices_by_skill, 'posted_date']).dt.days
        
        # A stronger recency bonus (multiplied by a constant)
        recency_bonus = 0.5 * np.exp(-days_since_posted / recency_decay_rate)
        combined_score += recency_bonus

    # Step 7: Filter by minimum final score threshold
    final_relevant_indices = relevant_indices_by_skill[combined_score > min_threshold]
    final_relevant_scores = combined_score[combined_score > min_threshold]
    
    if final_relevant_indices.empty:
        print(f"No internships found with a combined score above the final threshold of {min_threshold * 100}%.")
        return pd.DataFrame()
        
    # Step 8: Sort and return top results
    sorted_indices = np.argsort(final_relevant_scores.values)[::-1]
    
    recommended_indices = final_relevant_indices.values[sorted_indices][:top_n]
    recommended_scores = final_relevant_scores.values[sorted_indices][:top_n]

    recommended = df.loc[recommended_indices].copy()
    
    # Ensure matching_probability is capped at 100%
    recommended_scores_percent = np.minimum(recommended_scores * 100, 100.0)
    recommended["matching_probability"] = recommended_scores_percent.round(2)
    
    return recommended[["title", "sector", "location_state", "location_district", "skills", "languages", "matching_probability"]]

# ---------------------------
# 4. Example usage
# ---------------------------
if __name__ == "__main__":
    user_profile = {
        "Skills": ["react"],
        "Languages": ["English", "Hindi"],
        "Preferred_type": "IT",
        "Preferred_location_state": "karnataka",
        "Preferred_location_district": ""
    }
    
    min_match_score = 0.0
    min_skill_score = 0.1

    print("\nRecommendations for the User Profile:")
    recommended_internships = recommend_internships(df, user_profile, min_threshold=min_match_score, min_skill_threshold=min_skill_score)
    print(recommended_internships if not recommended_internships.empty else "No recommendations found.")