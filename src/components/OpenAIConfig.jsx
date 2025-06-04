import React, { useState } from 'react';

const OpenAIConfig = () => {
  const [formData, setFormData] = useState({
    apiKey: '',
    deploymentName: '',
    model: '',
    deploymentVersion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Configured with:', formData);
  };

  return (
    <div className="p-4 mt-20 max-w-md mx-auto bg-white  border rounded">
      <h2 className="text-xl font-bold mb-4">OpenAI Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="apiKey" className="block mb-1 font-medium">API Key</label>
          <input
            type="password"
            id="apiKey"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-gray-300 p-2 rounded-lg outline-none"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deploymentName" className="block mb-1 font-medium">Deployment Name</label>
          <input
            type="text"
            id="deploymentName"
            name="deploymentName"
            value={formData.deploymentName}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-gray-300 p-2 rounded-lg outline-none"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="model" className="block mb-1 font-medium">Model Name</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-gray-300 p-2 rounded-lg outline-none"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deploymentVersion" className="block mb-1 font-medium">Deployment Version</label>
          <input
            type="text"
            id="deploymentVersion"
            name="deploymentVersion"
            value={formData.deploymentVersion}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-gray-300 p-2 rounded-lg outline-none"
            required
          />
        </div>

        {/* Additional fields can be added here if needed */}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-green-200 text-green-800 font-semibold py-2 px-4 rounded"
          >
            Configure
          </button>
        </div>
      </form>
    </div>
  );
};

export default OpenAIConfig;
