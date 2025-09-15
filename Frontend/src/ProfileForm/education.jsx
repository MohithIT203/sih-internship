import React, { useState } from "react";
import { SchoolIcon } from "../assets/icons";
import { MenuItem, TextField, Typography } from "@mui/material";
import Buttons from "./buttons";

export default function Education({ pointer, setPointer }) {
  const degree = {
    "B.Tech / B.E": ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics", "AI & ML", "IT"],
    "B.Arch": ["Architecture"],
    "B.Des": ["Design"],
    "B.Sc": ["Physics", "Chemistry", "Mathematics", "Biology", "Statistics", "Microbiology", "Biotechnology"],
    "BCA": ["Computer Applications"],
    "B.Com": ["Accounting", "Finance", "Economics"],
    "BBA": ["Business", "Administration", "Management"],
  };

  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [errors, setErrors] = useState({
    course: false,
    branch: false,
  });

  const handleSubmit = () => {
    let newErrors = {
      course: course === "",
      branch: branch === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    console.log({ course, branch });
    setPointer(pointer + 1);
  };

  return (
    <form className="flex flex-col gap-10">
      {/* Course Dropdown */}
      <div className="flex flex-col items-start gap-2">
        <Typography>Course</Typography>
        <TextField
          select
          fullWidth
          label={
            <span className="flex items-center gap-5">
              <SchoolIcon /> Select your course
            </span>
          }
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            setBranch(""); // Reset branch when course changes
            setErrors((prev) => ({ ...prev, course: false, branch: false }));
          }}
          error={errors.course}
          helperText={errors.course ? "Please select your course" : ""}
        >
          {Object.keys(degree).map((deg) => (
            <MenuItem key={deg} value={deg}>
              {deg}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* Branch Dropdown */}
      <div className="flex flex-col items-start gap-2">
        <Typography>Branch</Typography>
       <TextField
  select
  fullWidth
  label={
    <span className="flex items-center gap-5">
      <SchoolIcon /> Select your branch
    </span>
  }
  value={branch}
  onChange={(e) => {
    setBranch(e.target.value);
    setErrors((prev) => ({ ...prev, branch: false }));
  }}
  error={errors.branch}
  helperText={errors.branch ? "Please select your branch" : ""}
  disabled={!course}
>
  {course
    ? degree[course].map((b) => (
        <MenuItem key={b} value={b}>
          {b}
        </MenuItem>
      ))
    : [<MenuItem key="empty" value="">Select a course first</MenuItem>]}
</TextField>

      </div>

      {/* Buttons */}
      <Buttons pointer={pointer} setPointer={setPointer} handleSubmit={handleSubmit} />
    </form>
  );
}
