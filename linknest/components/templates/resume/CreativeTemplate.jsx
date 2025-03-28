import React from "react";

const CreativeTemplate = ({ resumeData }) => {
  const { personalInfo, education, experiences, skills, projects } = resumeData;

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md font-sans">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          {personalInfo.name}
        </h1>
        <div className="text-gray-600">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </header>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Education
          </h2>
          <ul>
            {education.map((edu, index) => (
              <li key={index} className="mb-4">
                <h3 className="font-semibold text-lg">
                  {edu.degree} - {edu.school}
                </h3>
                <p className="text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && <p>{edu.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Experience
          </h2>
          <ul>
            {experiences.map((exp, index) => (
              <li key={index} className="mb-4">
                <h3 className="font-semibold text-lg">
                  {exp.role} - {exp.company}
                </h3>
                <p className="text-gray-600">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
                {exp.description && <p>{exp.description}</p>}
                {exp.skillsUsed.length > 0 && (
                  <div className="mt-2">
                    <span className="font-semibold">Skills Used:</span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {exp.skillsUsed.map((skill, skillIndex) => (
                        <li
                          key={skillIndex}
                          className="border px-3 py-1 rounded-full bg-blue-100 text-blue-700"
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

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Projects
          </h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="mb-4">
                <h3 className="font-semibold text-lg">{project.title}</h3>
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
                <p className="text-gray-600">
                  {project.startDate} -{" "}
                  {project.current ? "Present" : project.endDate}
                </p>
                {project.description && <p>{project.description}</p>}
                {project.technologies.length > 0 && (
                  <div className="mt-2">
                    <span className="font-semibold">Technologies Used:</span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((technology, techIndex) => (
                        <li
                          key={techIndex}
                          className="border px-3 py-1 rounded-full bg-blue-100 text-blue-700"
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
    </div>
  );
};

export default CreativeTemplate;
