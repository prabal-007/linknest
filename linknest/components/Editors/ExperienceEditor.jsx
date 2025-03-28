import { useState } from "react";

export default function ExperienceEditor({ experiences, setExperiences }) {
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false, // New field for "Currently Work Here"
    skillsUsed: [], // New field for skills used
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e, field) => {
    const value = field === "current" ? e : e.target.value;
    setNewExperience({ ...newExperience, [field]: value });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editingIndex] = newExperience;
      setExperiences(updatedExperiences);
      setEditingIndex(null);
    } else {
      setExperiences([...experiences, newExperience]);
    }
    setNewExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
      skillsUsed: [],
    });
    setNewSkill("");
  };

  const handleEdit = (index) => {
    setNewExperience(experiences[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setNewExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
      skillsUsed: [],
    });
    setEditingIndex(null);
    setNewSkill("");
  };

  const handleClear = () => {
    setNewExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
      skillsUsed: [],
    });
    setNewSkill("");
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setNewExperience({
        ...newExperience,
        skillsUsed: [...newExperience.skillsUsed, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (skillIndex) => {
    setNewExperience({
      ...newExperience,
      skillsUsed: newExperience.skillsUsed.filter((_, i) => i !== skillIndex),
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="company" className="text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => handleChange(e, "company")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            placeholder="Role"
            value={newExperience.role}
            onChange={(e) => handleChange(e, "role")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={newExperience.startDate}
              onChange={(e) => handleChange(e, "startDate")}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={newExperience.endDate}
              onChange={(e) => handleChange(e, "endDate")}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={newExperience.current}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="current"
            checked={newExperience.current}
            onChange={(e) => handleChange(e.target.checked, "current")}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="current" className="text-sm font-medium text-gray-700">
            Currently Work Here
          </label>
        </div>
        <div className="grid gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) => handleChange(e, "description")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="skillsUsed" className="text-sm font-medium text-gray-700">
            Skills Used
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="skillsUsed"
              placeholder="Add Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddSkill}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {newExperience.skillsUsed.map((skill, index) => (
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
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editingIndex !== null ? "Save Changes" : "Add Experience"}
          </button>
          {editingIndex !== null && (
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
          >
            Clear
          </button>
        </div>
      </div>
      <ul className="mt-4">
        {experiences.map((exp, index) => (
          <li
            key={index}
            className="border p-3 rounded-md mb-2 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">
                {exp.role} at {exp.company}
              </p>
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </p>
              <p className="text-gray-700">{exp.description}</p>
              {exp.skillsUsed.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold">Skills Used:</span>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {exp.skillsUsed.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="border px-3 py-1 rounded-full bg-gray-200 text-gray-700"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
