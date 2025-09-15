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

export default function InternshipProfileForm() {
  const data = ["Education", "Skills", "Internship Details"];
  const length = data.length;
  const [pointer, setPointer] = useState(0);
  

  return (
    <div className="flex justify-center mt-16">
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
          h-[600px] overflow-y-scroll"
        >
          <div style={{ display: pointer === 0 ? "block" : "none" }}>
            <Education pointer={pointer} setPointer={setPointer} />
          </div>
          <div style={{ display: pointer === 1 ? "block" : "none" }}>
            <Skills pointer={pointer} setPointer={setPointer} />
          </div>
          <div style={{ display: pointer === 2 ? "block" : "none" }}>
            <Perference pointer={pointer} setPointer={setPointer} />
          </div>
        </div>
      </div>
    </div>
  );
}
