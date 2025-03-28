import { useState, useEffect } from "react";

const commonDegrees = [
  "Associate of Arts (AA)",
  "Associate of Science (AS)",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BS)",
  "Bachelor of Technology (B.Tech)",
  "Bachelor of Fine Arts (BFA)",
  "Master of Arts (MA)",
  "Master of Science (MS)",
  "Master of Business Administration (MBA)",
  "Doctor of Philosophy (PhD)",
  "Juris Doctor (JD)",
  "Medical Doctor (MD)",
  "High School Diploma",
  "GED",
  "Certificate",
  "Diploma",
  "Other",
];

export default function EducationEditor({ education, setEducation }) {
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showCustomDegree, setShowCustomDegree] = useState(false);

  const handleChange = (e, field) => {
    const value = e.target.value;
    setNewEducation({ ...newEducation, [field]: value });

    if (field === "degree") {
      setShowCustomDegree(value === "Other");
    }
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedEducation = [...education];
      updatedEducation[editingIndex] = newEducation;
      setEducation(updatedEducation);
      setEditingIndex(null);
    } else {
      setEducation([...education, newEducation]);
    }
    setNewEducation({ school: "", degree: "", startDate: "", endDate: "", description: "" });
    setShowCustomDegree(false);
  };

  const handleEdit = (index) => {
    setNewEducation(education[index]);
    setEditingIndex(index);
    setShowCustomDegree(education[index].degree === "Other");
  };

  const handleDelete = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setNewEducation({ school: "", degree: "", startDate: "", endDate: "", description: "" });
    setEditingIndex(null);
    setShowCustomDegree(false);
  };

  const handleClear = () => {
    setNewEducation({ school: "", degree: "", startDate: "", endDate: "", description: "" });
    setShowCustomDegree(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="school" className="text-sm font-medium text-gray-700">
            School
          </label>
          <input
            type="text"
            id="school"
            value={newEducation.school}
            onChange={(e) => handleChange(e, "school")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="degree" className="text-sm font-medium text-gray-700">
            Degree
          </label>
          <select
            id="degree"
            value={newEducation.degree}
            onChange={(e) => handleChange(e, "degree")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Degree</option>
            {commonDegrees.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
          {showCustomDegree && (
            <input
              type="text"
              id="customDegree"
              placeholder="Enter your degree"
              value={newEducation.degree}
              onChange={(e) => handleChange(e, "degree")}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={newEducation.startDate}
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
              value={newEducation.endDate}
              onChange={(e) => handleChange(e, "endDate")}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={newEducation.description}
            onChange={(e) => handleChange(e, "description")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {editingIndex !== null ? "Save Changes" : "Add Education"}
          </button>
          {editingIndex !== null && (
            <button onClick={handleCancel} className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          )}
          <button onClick={handleClear} className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400">
            Clear
          </button>
        </div>
      </div>
      <ul className="mt-4">
        {education.map((edu, index) => (
          <li key={index} className="border p-3 rounded-md mb-2 bg-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold">
                {edu.degree} at {edu.school}
              </p>
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
              <p className="text-gray-700">{edu.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(index)} className="text-blue-500 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
