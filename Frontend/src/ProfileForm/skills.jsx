import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography,
} from "@mui/material";

import { FeedSharp } from "../assets/icons";
import Buttons from "./buttons";

const suggestedSkills = [
  "JavaScript", "Python", "React", "Node.js", "Java", "C++", "SQL", "Git",
  "Machine Learning", "Data Analysis", "Design", "Marketing", "Communication",
  "Project Management", "Research", "Writing", "Excel", "PowerPoint"
];

const indianLanguages = [
  "Tamil", "English", "Hindi", "Bengali", "Telugu", "Marathi", "Urdu",
  "Gujarati", "Kannada", "Odia", "Punjabi", "Malayalam", "Assamese",
  "Maithili", "Santali", "Kashmiri", "Nepali", "Konkani", "Sindhi",
  "Manipuri", "Dogri", "Bodo", "Sanskrit"
];

export default function Skills({ pointer, setPointer, setInputs }) {
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [errors, setErrors] = useState({
    skills: false,
    languages: false,
    certifications: false,
  });

  const handleSubmit = () => {

    if (skills.length === 0) {
      setErrors((prev) => ({ ...prev, skills: true }));
      return;
    }
    if (languages.length === 0) {
      setErrors((prev) => ({ ...prev, languages: true }));
      return;
    }


    setErrors({ skills: false, languages: false });

    setInputs((prev) => ({
      ...prev,
      skills: skills,  
      languages: languages 
    }));

    console.log({ skills, languages });


    setPointer(pointer + 1);
  };

  return (
    <Box sx={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 5 }}>
      {/* Skills Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          Skills & Interests
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Add your technical and soft skills, plus areas of interest
        </Typography>

        <Autocomplete
          multiple
          freeSolo
          options={suggestedSkills}
          value={skills}
          onChange={(event, newValue) => setSkills(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...chipProps } = getTagProps({ index });
              return <Chip key={key} label={option} {...chipProps} />;
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Skills *"
              error={errors.skills}
              helperText={errors.skills ? "Please add at least one skill" : ""}
            />
          )}
        />

        <Typography variant="body2" sx={{ mt: 2, fontWeight: 500 }}>
          Suggested skills:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {suggestedSkills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onClick={() => {
                if (!skills.includes(skill)) {
                  setSkills([...skills, skill]);
                }
              }}
              variant="outlined"
              sx={{ cursor: "pointer", borderRadius: "16px" }}
            />
          ))}
        </Box>
      </Box>

      {/* Languages Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          Languages
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Select the languages you know
        </Typography>

        <Autocomplete
          multiple
          freeSolo
          options={indianLanguages}
          value={languages}
          onChange={(event, newValue) => setLanguages(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...chipProps } = getTagProps({ index });
              return <Chip key={key} label={option} {...chipProps} />;
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Languages *"
              error={errors.languages}
              helperText={errors.languages ? "Please select at least one language" : ""}
            />
          )}
        />

        <Typography variant="body2" sx={{ mt: 2, fontWeight: 500 }}>
          Suggested languages:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {indianLanguages.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              onClick={() => {
                if (!languages.includes(lang)) {
                  setLanguages([...languages, lang]);
                }
              }}
              variant="outlined"
              sx={{ cursor: "pointer", borderRadius: "16px" }}
            />
          ))}
        </Box>
      </Box>

      {/* Buttons */}
      <Buttons pointer={pointer} setPointer={setPointer} handleSubmit={handleSubmit} />
    </Box>
  );
}
