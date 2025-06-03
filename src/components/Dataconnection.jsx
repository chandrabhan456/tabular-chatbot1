import React, { useState } from 'react';
import "./DataConn.css"
import { IoIosClose } from "react-icons/io";
const DataConnection = () => {
  // State for each button
  const [csvActive, setCsvActive] = useState(true);
  const [databaseActive, setDatabaseActive] = useState(false);
  const [cloudActive, setCloudActive] = useState(false);
     const [csvFiles, setCsvFiles] = useState([]); // Store multiple files
  
  const [csvFileType, setCsvFileType] = useState(null);
  // Function to toggle CSV File button state
  const toggleCSV = () => {
    setCsvActive(true);
    setDatabaseActive(false);
    setCloudActive(false);
  };

  // Function to toggle Database Connection button state
  const toggleDatabase = () => {
    setCsvActive(false);
    setDatabaseActive(true);
    setCloudActive(false);
  };

  // Function to toggle Cloud Storage button state
  const toggleCloud = () => {
    setCsvActive(false);
    setDatabaseActive(false);
    setCloudActive(true);
  };
  const handleFileChange = (event) => {
    console.log("File input event:", event.target.files);
    const files = Array.from(event.target.files); // Convert FileList to array

    // Filter valid files
    const validFiles = files.filter(
      (file) =>
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Alert if no valid files are selected
    if (validFiles.length === 0) {
      alert("Please upload valid CSV or Excel files.");
      return;
    }

    // Map valid files to include metadata
    const newFiles = validFiles.map((file) => ({
      fileObject: file,
      name: file.name,
      type: file.type,
      timestamp: Date.now(),
    }));

    // Append new files to the existing state
    setCsvFiles((prev) => [...prev, ...newFiles]);

    // Clear the file input to allow re-selection of the same file
    event.target.value = null;
  };
  const handleCsvRemove = (fileObject) => {
    console.log("removecsv", fileObject);
     // Filter out the file to be removed
     const updatedFiles = csvFiles.filter((file) => file.name !== fileObject.name);
     console.log("updatedcsvFIles",!updatedFiles)
     // Update the state with the remaining files
     setCsvFiles(updatedFiles);
     setMessage('')
     setErrMessage('')
     console.log("updated files",updatedFiles.length)
      if(updatedFiles.length ===0) {
      console.log("empty")
      setCsvFiles([])
     
     
    }
    else{
      const firstFileURL = URL.createObjectURL(updatedFiles[0].fileObject);
      console.log("firstfileurl",firstFileURL)
      setCsvFiles(firstFileURL);
     
    }
}
  

  return (
    <div className="flex flex-col mt-10 ml-10 space-y-2">
      <div className="flex space-x-12 mt-2">
        <button
          className={`flex items-center space-x-2 text-lg ${
            csvActive ? 'font-bold text-blue-500' : 'text-gray-700'
          }`}
          onClick={toggleCSV}
        >
          <span role="img" aria-label="CSV File">🗂️</span>
          <span>CSV File</span>
        </button>

        <button
          className={`flex items-center space-x-2 text-lg ${
            databaseActive ? 'font-bold text-blue-500' : 'text-gray-700'
          }`}
          onClick={toggleDatabase}
        >
          <span role="img" aria-label="Database Connection">💾</span>
          <span>Database Connection</span>
        </button>

        <button
          className={`flex items-center space-x-2 text-lg ${
            cloudActive ? 'font-bold text-blue-500' : 'text-gray-700'
          }`}
          onClick={toggleCloud}
        >
          <span role="img" aria-label="Cloud Storage">☁️</span>
          <span>Cloud Storage</span>
        </button>
      </div>

      <hr className="w-full border-t border-gray-300" />

      <div className="mt-4">
        {csvActive && <><div className="upload-container  dark:bg-[#1e1e1e] bg-[#f7f7f7] border border-gray-300 dark:border-[#4f4f4f] border-dashed">
      <input
              id="file-upload"
              type="file"
              multiple
        accept=".csv, .xls, .xlsx"
        onChange={handleFileChange}
              className="hidden-input"
            />
<label htmlFor="file-upload" className="drag-label dark:text-[#D3D3D3]">
  Drag & drop a Excel or CSV file here, or click to browse
</label>
        
        </div>
         {csvFiles.map((file, index) => (
          <div key={index} className="flex items-center mt-2">
            {/* Icon based on file type */}
           
          
            {/* File Name */}
            <p
               className="ml-1 text-left truncate  dark:text-[#d3d3d3] text-black"
               style={{
                 cursor: "pointer",
                 
            
                 overflow: "hidden", // Prevent overflowing text
                 whiteSpace: "nowrap", // Prevent wrapping to the next line
                 textOverflow: "ellipsis", // Add ellipsis for overflow
                 maxWidth: "85%", // Adjust the width as needed
               }}
              
            >
              {file.name}
            </p>
            {/* Remove File */}
            <IoIosClose
              className="ml-4 dark:text-[#d3d3d3]"
              style={{ cursor: "pointer" }}
              onClick={() => handleCsvRemove(file)}
            />
          </div>
        ))}
        </>
        }
        {databaseActive && <div>Database Connection Content: Connect to your database here.</div>}
        {cloudActive && <div>Cloud Storage Content: Manage your cloud storage services.</div>}
      </div>
    </div>
  );
};

export default DataConnection;
