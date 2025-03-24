"use client";

import { useState } from "react";
import { FaDownload, FaGlobe, FaMagic } from "react-icons/fa";

export default function ResumeBuilder() {
  const [template, setTemplate] = useState("modern");
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [sections, setSections] = useState({
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  });

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Resume Sections</h2>
        <ul>
          {Object.keys(sections).map((section) => (
            <li key={section} className="mb-2 p-2 bg-gray-200 rounded cursor-pointer">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Resume Preview */}
      <div className="w-1/2 bg-white mx-4 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">Resume Preview</h2>
        <div className="border p-4 min-h-[500px] rounded-lg">
          {/* Placeholder for resume content */}
          <p className="text-center text-gray-400">Live resume preview will appear here.</p>
        </div>
      </div>

      {/* Editing Panel */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Edit Resume</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 mb-2"
          value={personalInfo.name}
          onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          className="w-full border p-2 mb-2"
          value={personalInfo.email}
          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-2 mb-2"
          value={personalInfo.phone}
          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 mb-4"
          value={personalInfo.location}
          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
        />
        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded">
            <FaDownload /> Export
          </button>
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded">
            <FaGlobe /> Publish
          </button>
          <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded">
            <FaMagic /> AI Assist
          </button>
        </div>
      </div>
    </div>
  );
}
