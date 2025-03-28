import React from "react";

const ClassicTemplate = ({ resumeData }) => {
  const { personalInfo, education, experiences, skills, projects } = resumeData;

  return (
    <div className="max-w-3xl mx-auto p-8 font-serif">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase">{personalInfo.name}</h1>
        <div className="text-gray-600">
          <p>{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</p>
        </div>
      </header>

      {/* Summary/Objective (Optional) */}
      {/* will add a summary/objective section here later */}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">
            Experience
          </h2>
          <ul>
            {experiences.map((exp, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-700">{exp.company}</p>
                {exp.description && <p className="mt-2">{exp.description}</p>}
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
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">
            Education
          </h2>
          <ul>
            {education.map((edu, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <p className="text-gray-700">{edu.school}</p>
                {edu.description && <p className="mt-2">{edu.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">
            Projects
          </h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="mb-4">
                <h3 className="font-semibold">{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {project.link}
                  </a>
                )}
                <p className="text-gray-600 text-sm">
                  {project.startDate} - {project.current ? "Present" : project.endDate}
                </p>
                {project.description && <p className="mt-2">{project.description}</p>}
                {project.technologies.length > 0 && (
                  <div className="mt-2">
                    <span className="font-semibold">Technologies Used:</span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((technology, techIndex) => (
                        <li
                          key={techIndex}
                          className="border px-3 py-1 rounded-full bg-gray-200 text-gray-700"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="border px-3 py-1 rounded-full bg-gray-200 text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
