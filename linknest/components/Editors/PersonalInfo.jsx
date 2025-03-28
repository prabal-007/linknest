import { useState } from "react";

export default function PersonalInfoEditor({ personalInfo, setPersonalInfo }) {
  const handleChange = (e, field) => {
    setPersonalInfo({ ...personalInfo, [field]: e.target.value });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={personalInfo.name}
            onChange={(e) => handleChange(e, "name")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={(e) => handleChange(e, "email")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange(e, "phone")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="location" className="text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            value={personalInfo.location}
            onChange={(e) => handleChange(e, "location")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
