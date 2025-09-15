from flask import Flask, jsonify
import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ---------------------------
# 1. Fetch internships
# ---------------------------
def fetch_internships():
    url = "http://localhost:5000/all-internship"
    data = requests.get(url).json()
    df = pd.json_normalize(data)

    for col in ["qualification.skills", "qualification.course",
                "location.state", "location.district", "sector", "title"]:
        if col not in df.columns:
            df[col] = ""

    df["qualification.skills"] = df["qualification.skills"].apply(
        lambda x: " ".join(x) if isinstance(x, list) else str(x)
    )
    df["qualification.course"] = df["qualification.course"].fillna("")
    df["location.state"] = df["location.state"].fillna("")
    df["location.district"] = df["location.district"].fillna("")
    df["sector"] = df["sector"].fillna("")

    return df

# ---------------------------
# 2. Fetch user profile
# ---------------------------
def fetch_user_profile(user_id):
    url = f"http://localhost:5000/profile/{user_id}"
    profile = requests.get(url).json()
    return profile

# ---------------------------
# 3. Recommendation logic
# ---------------------------
def recommend_internships(df, student_profile, top_n=5):
    df["combined_text"] = (
        df["qualification.course"].astype(str) + " " +
        df["qualification.skills"].astype(str) + " " +
        df["sector"].astype(str) + " " +
        df["location.state"].astype(str) + " " +
        df["location.district"].astype(str)
    )

    student_text = (
        student_profile.get("Course", "") + " " +
        student_profile.get("Branch", "") + " " +
        " ".join(student_profile.get("Skills", [])) + " " +
        " ".join(student_profile.get("Languages", [])) + " " +
        student_profile.get("Preferred_type", "") + " " +
        student_profile.get("Preferred_state", "") + " " +
        " ".join(student_profile.get("Preferred_district", []))
    )

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df["combined_text"].tolist() + [student_text])

    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
    df["similarity"] = cosine_sim

    top_df = df.sort_values(by="similarity", ascending=False).head(top_n)

    # Convert into clean JSON
    recs = []
    for _, row in top_df.iterrows():
        recs.append({
            "title": row.get("title", ""),
            "sector": row.get("sector", ""),
            "location_state": row.get("location.state", ""),
            "location_district": row.get("location.district", ""),
            "skills": row.get("qualification.skills", "").split(),
            "languages": student_profile.get("Languages", []),
            "matching_probability": round(row["similarity"] * 100, 2),
            "company": row.get("company", ""),
        })
    return recs

# ---------------------------
# 4. Flask route
# ---------------------------
@app.route("/recommendations/<user_id>", methods=["GET"])
def get_recommendations(user_id):
    df = fetch_internships()
    student_profile = fetch_user_profile(user_id)
    recs = recommend_internships(df, student_profile, top_n=5)
    return jsonify(recs)

if __name__ == "__main__":
    app.run(port=8000, debug=True)
