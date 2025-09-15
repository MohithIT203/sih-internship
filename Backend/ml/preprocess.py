import requests
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# ---------------------------
# 1. Fetch internships from Node.js API
# ---------------------------
url = "http://localhost:5000/all-internship"
data = requests.get(url).json()
df = pd.json_normalize(data)

# Flatten fields
df["skills"] = df["qualification.skills"].apply(lambda x: " ".join(x) if isinstance(x, list) else "")
df["certificates"] = df["qualification.certificates"].apply(lambda x: " ".join(x) if isinstance(x, list) else "")
df["title"] = df["title"].fillna("")
df["sector"] = df["sector"].fillna("")
df["field"] = df["field"].fillna("")
df["location"] = df["location.state"].fillna("")

# Add languages if available
if "qualification.languages" in df.columns:
    df["languages"] = df["qualification.languages"].apply(lambda x: " ".join(x) if isinstance(x, list) else "")
else:
    df["languages"] = ""

# ---------------------------
# 2. Encode categorical fields (sector)
# ---------------------------
encoder = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
sector_encoded = encoder.fit_transform(df[["sector"]])
sector_df = pd.DataFrame(sector_encoded, columns=encoder.get_feature_names_out(["sector"]))

# ---------------------------
# 3. Encode text fields (skills + title + field + location + languages)
# ---------------------------
vectorizer = TfidfVectorizer(max_features=100)
skills_encoded = vectorizer.fit_transform(
    df["skills"] + " " + df["title"] + " " + df["field"] + " " + df["location"] + " " + df["languages"]
).toarray()
skills_df = pd.DataFrame(skills_encoded, columns=vectorizer.get_feature_names_out())

# ---------------------------
# 4. Normalize numeric features
# ---------------------------
numeric_cols = ["stipend", "total_applied"]
for col in numeric_cols:
    if col not in df.columns:
        df[col] = 0
scaler = StandardScaler()
numeric_df = pd.DataFrame(
    scaler.fit_transform(df[numeric_cols]),
    columns=[f"{c}_scaled" for c in numeric_cols]
)

# ---------------------------
# 5. Combine features into ML-ready matrix
# ---------------------------
final_features = pd.concat([numeric_df, sector_df, skills_df], axis=1)

# ---------------------------
# 6. Recommendation Function with Rule-based Bonuses
# ---------------------------
def recommend_internships(user_skills, user_sector="", user_location="", user_languages=None, top_n=5):
    if user_languages is None:
        user_languages = []

    # 1. Add a hard filter for location at the top
    # First, make a copy to avoid modifying the original DataFrame
    filtered_df = df.copy() 
    
    # If a location is provided, filter the DataFrame
    if user_location:
        filtered_df = filtered_df[filtered_df["location"].str.contains(user_location, case=False, na=False)]

    # Handle the case where no internships match the location filter
    if filtered_df.empty:
        print("No internships found for the specified location.")
        return pd.DataFrame() # Return an empty DataFrame

    # 2. Get the indices of the filtered DataFrame
    filtered_indices = filtered_df.index
    
    # 3. Use these indices to select the corresponding rows from the feature matrices
    filtered_skills_df = skills_df.loc[filtered_indices]
    
    # ... (repeat for other feature matrices if needed, although for your code it's only skills_df)

    # Build user profile text
    user_text = " ".join(user_skills) + " " + user_sector + " " + user_location + " " + " ".join(user_languages)
    user_vector = vectorizer.transform([user_text]).toarray()
    
    # Cosine similarity on the *filtered* data
    cos_sim = cosine_similarity(user_vector, filtered_skills_df)[0]
    
    # Rule-based bonuses now apply to the filtered data
    sector_score = np.array([10 if s.lower() == user_sector.lower() else 0 for s in filtered_df["sector"]])
    # location_score and language_score calculation would also be updated to use filtered_df
    location_score = np.array([
      8 if user_location.lower() in str(loc).lower() else 0 for loc in filtered_df["location"]
    ])

    language_score = np.array([
      5 if any(lang.lower() in str(langs).lower() for lang in user_languages) else 0
      for langs in filtered_df["languages"]
    ])
    
    # Combine scores and sort as before
    total_score = cos_sim * 50 + sector_score + location_score + language_score
    matching_prob = (total_score / (50 + 10 + 8 + 5)) * 100
    top_indices_in_filtered_df = np.argsort(total_score)[::-1][:top_n]

    # Map back to original DataFrame indices
    recommended_indices = filtered_indices[top_indices_in_filtered_df]
    
    recommended = df.loc[recommended_indices][["title", "sector", "location", "skills", "languages"]].copy()
    recommended["matching_probability"] = matching_prob[top_indices_in_filtered_df].round(2)
    
    return recommended

# ---------------------------
# 7. Example usage
# ---------------------------
if __name__ == "__main__":
    user_skills = ["Electronics,C/c++,Microcontrollers,iot"]
    user_sector = "Electronics"
    user_location = "Delhi"
    user_languages = ["English", "Hindi"]

    recommended = recommend_internships(user_skills, user_sector, user_location, user_languages)
    print("\nTop Recommended Internships with Matching Probability:")
    print(recommended)
