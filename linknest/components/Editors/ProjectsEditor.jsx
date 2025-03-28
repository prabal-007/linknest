import { useState } from "react";

export default function ProjectsEditor({ projects, setProjects }) {
  const [newProject, setNewProject] = useState({
    title: "",
    link: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
    technologies: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTechnology, setNewTechnology] = useState("");

  const handleChange = (e, field) => {
    const value = field === "current" ? e : e.target.value;
    setNewProject({ ...newProject, [field]: value });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = newProject;
      setProjects(updatedProjects);
      setEditingIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }
    setNewProject({
      title: "",
      link: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
      technologies: ["new"],
    });
    setNewTechnology("");
  };

  const handleEdit = (index) => {
    setNewProject(projects[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setNewProject({
      title: "",
      link: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
      technologies: [],
    });
    setEditingIndex(null);
    setNewTechnology("");
  };

  const handleClear = () => {
    setNewProject({
      title: "",
      link: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
      technologies: [],
    });
    setNewTechnology("");
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() !== "") {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTechnology.trim()],
      });
      setNewTechnology("");
    }
  };

  const handleDeleteTechnology = (technologyIndex) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== technologyIndex),
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => handleChange(e, "title")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="link" className="text-sm font-medium text-gray-700">
            Project Link
          </label>
          <input
            type="text"
            id="link"
            placeholder="Project Link"
            value={newProject.link}
            onChange={(e) => handleChange(e, "link")}
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
              value={newProject.startDate}
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
              value={newProject.endDate}
              onChange={(e) => handleChange(e, "endDate")}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={newProject.current}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="current"
            checked={newProject.current}
            onChange={(e) => handleChange(e.target.checked, "current")}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="current" className="text-sm font-medium text-gray-700">
            Currently Working on it
          </label>
        </div>
        <div className="grid gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => handleChange(e, "description")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="technologies" className="text-sm font-medium text-gray-700">
            Technologies Used
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="technologies"
              placeholder="Add Technology"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTechnology}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {newProject.technologies.map((technology, index) => (
              <li
                key={index}
                className="border px-3 py-1 rounded-full bg-gray-100 flex items-center"
              >
                {technology}
                <button
                  onClick={() => handleDeleteTechnology(index)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {editingIndex !== null ? "Save Changes" : "Add Project"}
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
        {projects.map((project, index) => (
          <li key={index} className="border p-3 rounded-md mb-2 bg-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold">{project.title}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {project.link}
                </a>
              )}
              <p className="text-sm text-gray-600">
                {project.startDate} - {project.current ? "Present" : project.endDate}
              </p>
              <p className="text-gray-700">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold">Technologies Used:</span>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((technology, technologyIndex) => (
                      <li
                        key={technologyIndex}
                        className="border px-3 py-1 rounded-full bg-gray-200 text-gray-700"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
