import { useState } from "react";
import {
  Empty,
  Dotted,
  Connect,
  EmptyConnect,
  TickDotted,
  GreenConnect,
} from "../assets/stepbar";

import React from "react";
import Education from "./education";
import Skills from "./skills";
import Perference from "./preference";
import Navbar from "../components/navbar";

export default function InternshipProfileForm() {
  const userProfile = localStorage.getItem("profile");
  const [inputs,setInputs] = useState({
      course : "",
      branch : "",
      skills : [],
      languages : [],
      sector : "",
      state : "",
      districts : []
  })

  const data = ["Education", "Skills", "Internship Details"];
  const length = data.length;
  const [pointer, setPointer] = useState(0);

  return (
    <>
    <Navbar/>
    <div className="flex justify-center mt-24">
      <div className="shadow-2xl rounded-2xl flex">
        {/* Left Sidebar Stepper */}
        <div className="flex flex-col bg-gradient-to-b from-[#D8DFFE] to-[#FCE6CB] rounded-l-2xl p-20 border-r border-gray-300">
          {data.map((label, index) => (
            <React.Fragment key={index}>
              <div className="flex gap-[10px]">
                {index < pointer ? <TickDotted /> : index === pointer ? <Dotted /> : <Empty />}

                <h3
                  className={`text-[#555555]  ${
                    index === pointer ? "font-semibold" : "font-medium"
                  }`}
                >
                  {label}
                </h3>
              </div>

              {index + 1 !== length &&
                (index < pointer ? <GreenConnect /> : index === pointer ? <Connect /> : <EmptyConnect />)}
            </React.Fragment>
          ))}
        </div>

        {/* Right Content */}
        <div
          id="components"
          className="bg-gradient-to-b from-[#D8DFFE] to-[#FCE6CB] 
          p-10 rounded-r-xl w-[600px] 
          h-[600px] overflow-y-scroll border-l border-gray-300"
        >
          <div style={{ display: pointer === 0 ? "block" : "none" }}>
            <Education pointer={pointer} setPointer={setPointer} inputs={inputs} setInputs={setInputs} />
          </div>
          <div style={{ display: pointer === 1 ? "block" : "none" }}>
            <Skills pointer={pointer} setPointer={setPointer} inputs={inputs} setInputs={setInputs} />
          </div>
          <div style={{ display: pointer === 2 ||  pointer === 3  ? "block" : "none" }}>
            <Perference pointer={pointer} setPointer={setPointer} inputs={inputs} setInputs={setInputs} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
