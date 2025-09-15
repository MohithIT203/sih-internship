import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";
import Buttons from "./buttons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Utility to normalize and remove diacritics
function normalizeText(str) {
  if (typeof str !== "string") return "";
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Utility to deduplicate array and remove falsy values
function uniqueArray(arr) {
  return [...new Set((arr || []).filter(Boolean))];
}

export default function Preference({ pointer, setPointer, inputs, setInputs }) {
  const [sector, setSector] = useState("");
  const [sectors, setSectors] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [errors, setErrors] = useState({
    sector: false,
    state: false,
    districts: false,
  });
  const userId = localStorage.getItem("user");

  // Fetch sectors on mount
  useEffect(() => {
    const sectorNames = [
      "IT",
      "Marketing",
      "Electronics",
      "Healthcare",
      "Finance",
    ];
    setSectors(uniqueArray(sectorNames));
    async function fetchSectors() {
      try {
        // Using a static array for demonstration (you can replace with a working API)
        const sectorNames = [
          "IT",
          "Marketing",
          "Electronics",
          "Healthcare",
          "Finance",
        ];
        setSectors(uniqueArray(sectorNames));
      } catch (err) {
        console.error("Error fetching sectors:", err);
        setSectors(["IT", "Marketing", "Electronics", "Healthcare", "Finance"]); // fallback
      }
    }
    fetchSectors();
  }, []);

  // Fetch states on mount
  useEffect(() => {
    async function fetchStates() {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "India" }),
          }
        );
        const data = await res.json();
        const stateNames = data.data.states.map((s) => normalizeText(s.name));
        setStates(uniqueArray(stateNames));
      } catch (err) {
        console.error("Error fetching states:", err);
        setStates(["Tamil Nadu", "Kerala", "Karnataka"]); // fallback
      }
    }
    fetchStates();
  }, []);
  
  // Fetch districts when selectedState changes
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistricts([]);
      return;
    }
    async function fetchDistricts() {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "India", state: selectedState }),
          }
        );
        const data = await res.json();
        const districtNames = data.data.map((d) => normalizeText(d));
        setDistricts(uniqueArray(districtNames));
      } catch (err) {
        console.error("Error fetching districts:", err);
        setDistricts(["Fallback District 1", "Fallback District 2"]); // fallback
      }
    }
    fetchDistricts();
  }, [selectedState]);

  const navigate = useNavigate();

  
    useEffect(() => {
      setInputs((prev) => ({
        ...prev,
        sector: sector,
        state: selectedState,
        districts: selectedDistricts,
      }));
    }, [sector, selectedState, selectedDistricts, setInputs]);
  
 const handleSubmit = async () => {
  const newErrors = {
    sector: sector === "",
    state: !selectedState,
    districts: selectedDistricts.length === 0,
  };
  setErrors(newErrors);

  if (Object.values(newErrors).some(Boolean)) return;

  try {
    const payload = {
      course: inputs.course,        
      branch: inputs.branch,
      skills: inputs.skills,
      languages: inputs.languages,
      sector: sector,
      state: selectedState,
      districts: selectedDistricts
    };

    const res = await axios.post(`http://localhost:5000/profile/${userId}`, payload);
    console.log("Profile Response:", res.data);

    navigate("/dashboard");
  } catch (err) {
    console.error("An Error Occurred:", err.response?.data || err.message);
  }

  if (pointer <= 2) setPointer(pointer + 1);
};

  return (
    <Box
      sx={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 4 }}
    >
    <Box
      sx={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 4 }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        Internship Details
      </Typography>

      {/* Sector selection */}
      <TextField
        select
        fullWidth
        label="Sector *"
        value={sector}
        onChange={(e) => {
          setSector(e.target.value);
        }}
        error={errors.sector}
        helperText={errors.sector ? "Please select sector" : ""}
        SelectProps={{ native: false }}
        
        >
        {sectors.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      {/* State selection */}
      <TextField
        select
        fullWidth
        label="Preferred State *"
        value={selectedState || ""}
        onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedDistricts([]); 
        }}
        error={errors.state}
        helperText={errors.state ? "Please select a state" : ""}
        SelectProps={{ native: false }}
      >
        {states.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        ))}
      </TextField>

      {/* Districts selection */}
      <Autocomplete
        multiple
        options={districts}
        value={selectedDistricts}
        onChange={(event, newValue) => setSelectedDistricts(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...otherTagProps } = getTagProps({ index });
            return <Chip key={key} label={option} {...otherTagProps} />;
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Preferred District(s) *"
            error={errors.districts}
            helperText={
              errors.districts ? "Please select at least one district" : ""
            }
            disabled={!selectedState} // disabled until state is selected
          />
        )}
      />
     

      {/* Buttons */}
      <Buttons
        pointer={pointer}
        setPointer={setPointer}
        handleSubmit={handleSubmit}
      />
     
    </Box>
    </Box>
  );
}
