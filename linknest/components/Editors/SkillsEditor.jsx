import { useState, useEffect } from "react";

const predefinedSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "Git",
  "Agile",
  "Project Management",
  "Communication",
  "Teamwork",
  "Problem-solving",
  "Leadership",
  "Time Management",
  "Data Analysis",
  "UI/UX Design",
  "Testing",
  "Debugging",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "REST APIs",
  "GraphQL",
  "TypeScript",
  "Express.js",
  "Angular",
  "Vue.js",
  "PHP",
  "Ruby on Rails",
  "Swift",
  "Kotlin",
  "C#",
  ".NET",
  "WordPress",
  "SEO",
  "Digital Marketing",
  "Social Media Marketing",
  "Content Creation",
  "Copywriting",
  "Graphic Design",
  "Illustrator",
  "Photoshop",
  "Figma",
  "Sketch",
];

export default function SkillsEditor({ skills, setSkills }) {
  const [newSkill, setNewSkill] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewSkill(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filtered = predefinedSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setNewSkill(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id !== "newSkill") {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <div className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            id="newSkill"
            placeholder="Add Skill"
            value={newSkill}
            onChange={handleInputChange}
            className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={newSkill.trim() === "" || skills.includes(newSkill.trim())}
          >
            Add
          </button>
        </div>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="border px-3 py-1 rounded-full bg-gray-100 flex items-center"
          >
            {skill}
            <button
              onClick={() => handleDeleteSkill(index)}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
