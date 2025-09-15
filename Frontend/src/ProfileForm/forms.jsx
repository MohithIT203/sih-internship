import React, { useState } from "react";
import {
  TextField,
  Button,
  LinearProgress,
  MenuItem,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WorkIcon from "@mui/icons-material/Work";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const formAttributes = {
  educationLevel: {
    label: "Education Level",
    name: "educationLevel",
    icon: <SchoolIcon />,
    placeholder: "Select your education level",
    type: "text",
    required: true,
    menuItems: ["High School", "Bachelor's", "Master's", "PhD"],
  },
  skills: {
    label: "Skills",
    name: "skills",
    icon: <PsychologyIcon />,
    placeholder: "Select your skills",
    type: "text",
    required: true,
    menuItems: ["JavaScript", "Python", "React", "C++"],
  },
  sector: {
    label: "Sector Interests",
    name: "sector",
    icon: <WorkIcon />,
    placeholder: "Select your sector interests",
    type: "text",
    required: true,
    menuItems: ["Finance", "Healthcare", "Tech", "Education"],
  },
  location: {
    label: "Location Preference",
    name: "location",
    icon: <FmdGoodIcon />,
    placeholder: "Select your location preference",
    type: "text",
    required: true,
    menuItems: ["Remote", "Bangalore", "Mumbai", "Delhi"],
  },
};

export default function InternshipProfileForm() {
  const [inputs, setInputs] = useState({
      educationLevel: "",
      skills: "",
      sector: "",
      location: "",
  });

  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const updatedInputs = { ...inputs, [name]: value };
    setInputs(updatedInputs);

    // Live progress calculation
    const filledCount = Object.keys(updatedInputs).filter(
      (key) => updatedInputs[key].trim() !== ""
    ).length;
    const totalFields = Object.keys(formAttributes).length;
    setProgress((filledCount / totalFields) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formAttributes).forEach(([key]) => {
      if (!inputs[key]) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
  };
  
  return (
    <div className="flex flex-col items-center justify-center  bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-3 ">Build Your Profile</h1>
        <p>This helps us find the best internships for you.</p>
      <div className="w-full p-6 ">
        <div className="flex justify-between items-center ">

        <p className="text-lg text-gray-600 mb-2 text-center">
          Profile Progress </p>
          <p>
            {Math.round(progress)}% Complete
        </p>
        </div>
        <LinearProgress
  variant="determinate"
  value={progress}
  sx={{
    height: 12, // Increase this value for more thickness
    borderRadius: 6,
    backgroundColor: "#f3f4f6", // Tailwind's gray-100
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#ef4444", // Tailwind's red-500
    },
  }}
/>


        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {Object.values(formAttributes).map((field, index) => (
            <div className="flex flex-col gap-1 w-full">
            <Typography className="flex">{field.label}</Typography>
            <TextField
              key={index}
              select
              label={
                <span className="flex items-center gap-2">
                  {field.icon}
                  {field.placeholder}
                </span>
              }
              name={field.name}
              value={inputs[field.name]}
              onChange={handleInput}
              error={errors[field.name]}
              helperText={errors[field.name] ? "This field is required" : ""}
              variant="filled"
              fullWidth
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "#f3f4f6",
                },
                "& .MuiFilledInput-input": {
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                },
              }}
            >
              {field.menuItems.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            </div>
          ))}

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#E21D48",
              fontSize: "1rem",
              padding: "12px",
              "&:hover": {
                backgroundColor: "#E21D48",
              },
            }}
            className="w-full"
          >
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}