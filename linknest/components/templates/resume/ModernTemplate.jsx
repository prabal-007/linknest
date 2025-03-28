import React from "react";

const ModernTemplate = ({ resumeData }) => {
  const { personalInfo, education, experiences, skills, projects } = resumeData;

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md font-sans">
      {/* Header Section */}
      <header className="mb-8 flex items-center">
        <div className="w-1/4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {personalInfo.name}
          </h1>
        </div>
        <div className="w-3/4 text-gray-600 text-right">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </header>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Experience Section */}
          {experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Experience
              </h2>
              <ul>
                {experiences.map((exp, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">
                        {exp.role}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700">{exp.company}</p>
                    {exp.description && <p>{exp.description}</p>}
                    {exp.skillsUsed.length > 0 && (
                      <div className="mt-2">
                        <span className="font-semibold">Skills Used:</span>
                        <ul className="flex flex-wrap gap-2 mt-1">
                          {exp.skillsUsed.map((skill, skillIndex) => (
                            <li
                              key={skillIndex}
                              className="border px-3 py-1 rounded-full bg-gray-100 text-gray-700"
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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
                        <span className="font-semibold">
                          Technologies Used:
                        </span>
                        <ul className="flex flex-wrap gap-2 mt-1">
                          {project.technologies.map(
                            (technology, techIndex) => (
                              <li
                                key={techIndex}
                                className="border px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                              >
                                {technology}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-1">
          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Education
              </h2>
              <ul>
                {education.map((edu, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="font-semibold text-lg">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700">{edu.school}</p>
                    <p className="text-gray-600 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.description && <p>{edu.description}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModernTemplate;
