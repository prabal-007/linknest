import { useState } from "react";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import CreativeTemplate from "./CreativeTemplate";
// import { ClassicTemplate } from "./ClassicTemplate";

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
};

export default function TemplateSwitcher({ resumeData }) {
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const TemplateComponent = templates[selectedTemplate];

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Select Resume Template</h2>
      <div className="flex gap-4 mb-4">
        {Object.keys(templates).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedTemplate(key)}
            className={`px-4 py-2 rounded ${
              selectedTemplate === key ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <div className="border p-4 rounded-lg shadow-md">
        <TemplateComponent resumeData={resumeData} />
      </div>
    </div>
  );
}
