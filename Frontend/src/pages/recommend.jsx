import axios from "axios";
import React, { useEffect, useState } from "react";

function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user"); // already stored at login
    axios.get(`http://localhost:8000/recommendations/${userId}`)
      .then(res => setRecs(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h2>Recommended Internships</h2>
      {recs.length === 0 ? (
        <p>No recommendations found</p>
      ) : (
        recs.map((r, i) => (
          <div key={i} style={{border:"1px solid #ddd", padding:"10px", margin:"10px"}}>
            <h3>{r.title}</h3>
            <p>{r.sector}</p>
            <p>{r.location_state}, {r.location_district}</p>
            <p>Skills: {r.skills.join(", ")}</p>
            <p>Languages: {r.languages.join(", ")}</p>
            <strong>Match: {r.matching_probability}%</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default Recommendations;
