"use client";

import EducationEditor from "@/components/Editors/EducationEditor";
import ExperienceEditor from "@/components/Editors/ExperienceEditor";
import PersonalInfoEditor from "@/components/Editors/PersonalInfo";
import ProjectsEditor from "@/components/Editors/ProjectsEditor";
import SkillsEditor from "@/components/Editors/SkillsEditor";
import TemplateSwitcher from "@/components/templates/resume/TemplateSwitcher";
import { useState, useRef } from "react";
import { FaDownload, FaGlobe, FaMagic } from "react-icons/fa";
import jsPDF from "jspdf";

export default function ResumeBuilder() {
  const [template, setTemplate] = useState("modern");
  const [activeSection, setActiveSection] = useState("personal");
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("editor");
  const resumeRef = useRef(null);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const resumeData = {
    personalInfo,
    education,
    experiences,
    skills,
    projects,
  };

  const handleExport = () => {
    if (resumeRef.current) {
      const doc = new jsPDF("p", "mm", "a4");
      const content = resumeRef.current;

      doc.html(content, {
        callback: function (doc) {
          doc.save("resume.pdf");
        },
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 0,
        y: 0,
        width: 210, //target width in the PDF document
        windowWidth: 1000, //window width in CSS pixels
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Resume Sections</h2>
        <ul className="mt-4">
          <li
            className={`cursor-pointer p-2 hover:bg-gray-200 ${
              activeSection === "personal" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              setActiveSection("personal");
              setActiveTab("editor");
            }}
          >
            Personal
          </li>
          <li
            className={`cursor-pointer p-2 hover:bg-gray-200 ${
              activeSection === "education" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              setActiveSection("education");
              setActiveTab("editor");
            }}
          >
            Education
          </li>
          <li
            className={`cursor-pointer p-2 hover:bg-gray-200 ${
              activeSection === "experience" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              setActiveSection("experience");
              setActiveTab("editor");
            }}
          >
            Experience
          </li>
          <li
            className={`cursor-pointer p-2 hover:bg-gray-200 ${
              activeSection === "skills" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              setActiveSection("skills");
              setActiveTab("editor");
            }}
          >
            Skills
          </li>
          <li
            className={`cursor-pointer p-2 hover:bg-gray-200 ${
              activeSection === "projects" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              setActiveSection("projects");
              setActiveTab("editor");
            }}
          >
            Projects
          </li>
        </ul>
      </div>

      {/* Resume Preview */}
      <div className="w-full bg-white mx-4 p-6 rounded-lg shadow-md overflow-y-scroll">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === "editor"
                ? "bg-gray-200 border-b-2 border-blue-500"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "preview"
                ? "bg-gray-200 border-b-2 border-blue-500"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>
        {/* Tab Content */}
        <div className="border w-full p-4 min-h-[500px] rounded-lg">
          {activeTab === "editor" && (
            <main className="w-full p-6">
              {activeSection === "personal" && (
                <PersonalInfoEditor
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                />
              )}
              {activeSection === "education" && (
                <EducationEditor
                  education={education}
                  setEducation={setEducation}
                />
              )}
              {activeSection === "experience" && (
                <ExperienceEditor
                  experiences={experiences}
                  setExperiences={setExperiences}
                />
              )}
              {activeSection === "skills" && (
                <SkillsEditor skills={skills} setSkills={setSkills} />
              )}
              {activeSection === "projects" && (
                <ProjectsEditor
                  projects={projects}
                  setProjects={setProjects}
                />
              )}
            </main>
          )}
          {activeTab === "preview" && (
            <div className="w-full p-6" ref={resumeRef}>
              <TemplateSwitcher resumeData={resumeData} />
            </div>
          )}
        </div>
      </div>

      {/* Editing Panel */}
      <div className="w-fit bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col gap-4 items-center justify-between mt-4">
          <button
            className="flex w-32 items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleExport}
          >
            <FaDownload /> Export
          </button>
          <button className="flex w-32 items-center gap-2 bg-green-500 text-white px-4 py-2 rounded">
            <FaGlobe /> Publish
          </button>
          <button className="flex w-32 items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded">
            <FaMagic /> AI Assist
          </button>
        </div>
      </div>
    </div>
  );
}
