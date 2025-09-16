import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userId = localStorage.getItem("user");
  const Name = localStorage.getItem("userName");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const Navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/profile/${userId}`);
        localStorage.setItem("profile", JSON.stringify(res.data));
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return <p className="text-center mt-6">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-6 text-red-600">No profile found</p>;
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
    {/* <button className="">Go back</button> */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>

     
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Name</h3>
        <p className="text-gray-600">{Name}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Education</h3>
        <p className="text-gray-600">{user.Course} - {user.Branch}</p>
      </div>


      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.Skills?.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Languages</h3>
        <p className="text-gray-600">{user.Languages?.join(", ")}</p>
      </div>

      {/* Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Preferences</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li><strong>Preferred State:</strong> {user.Preferred_state}</li>
          <li><strong>Preferred District(s):</strong> {user.Preferred_district?.join(", ")}</li>
          <li><strong>Preferred Sector:</strong> {user.Preferred_type}</li>
        </ul>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      onClick={() => Navigate("/form")}
      >
        Update Profile
      </button>
    </div>
    </>
  );
}

export default Profile;
