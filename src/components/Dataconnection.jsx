import React, { useState,useEffect } from "react";
import "./DataConn.css";
import { IoIosClose } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import CsvPreview from './CsvPreview'; // Adjust the path accordingly

const DataConnection = () => {
  // State for each button
  const [csvActive, setCsvActive] = useState(true);
  const [databaseActive, setDatabaseActive] = useState(false);
  const [cloudActive, setCloudActive] = useState(false);
  const [csvFiles, setCsvFiles] = useState([]); // Store multiple files
  const [message, setMessage] = useState("");
  const [errmessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
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
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Alert if no valid files are selected

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
    const updatedFiles = csvFiles.filter(
      (file) => file.name !== fileObject.name
    );
    console.log("updatedcsvFIles", !updatedFiles);
    // Update the state with the remaining files
    setCsvFiles(updatedFiles);
    setMessage("");
    setErrMessage("");
    console.log("updated files", updatedFiles.length);
    if (updatedFiles.length === 0) {
      console.log("empty");
      setCsvFiles([]);
    } else {
      const firstFileURL = URL.createObjectURL(updatedFiles[0].fileObject);
      console.log("firstfileurl", firstFileURL);
     // setCsvFiles(firstFileURL);
    }
  };
  const handleCsvClick = (fileObject) => {
    console.log("selectedpdf", fileObject);

    // Update the selected PDF file object for the viewer
  
    setCsvFile(fileObject); // Debugging the generated blob URL
  };
   useEffect(() => {
    console.log("Updated csvFiles:", csvFiles);
  }, [csvFiles]); // This will run after pdfFiles state is updated
 
 const handleUpload = async () => {
    
    setIsLoading(true);
    // Create a FormData object
    const formData = new FormData();
   
   csvFiles.forEach((file) => {
      formData.append('files', file.fileObject); // 'files' is the key used in the backend
    });
   
    try {
      const response = await fetch('http://localhost:3001/create_documents', {
        method: 'POST',
        body: formData, // Send FormData directly
      });
   
      if (!response.ok) {
        throw new Error(`Failed to upload files: ${response.statusText}`);
      }
   
      const data = await response.json();
      setMessage('Index created successfully!');
      
    } catch (error) {
      console.error('Error creating index:', error);
      setErrMessage(`Error creating index: ${error.message}`)
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-10 ml-10 space-y-2">
      <div className="flex space-x-12 mt-2">
        <button
          className={`flex items-center space-x-2 text-lg ${
            csvActive ? "font-bold text-blue-500" : "text-gray-700"
          }`}
          onClick={toggleCSV}
        >
          <span role="img" aria-label="CSV File">
            🗂️
          </span>
          <span>CSV File</span>
        </button>

        <button
          className={`flex items-center space-x-2 text-lg ${
            databaseActive ? "font-bold text-blue-500" : "text-gray-700"
          }`}
          onClick={toggleDatabase}
        >
          <span role="img" aria-label="Database Connection">
            💾
          </span>
          <span>Database Connection</span>
        </button>

        <button
          className={`flex items-center space-x-2 text-lg ${
            cloudActive ? "font-bold text-blue-500" : "text-gray-700"
          }`}
          onClick={toggleCloud}
        >
          <span role="img" aria-label="Cloud Storage">
            ☁️
          </span>
          <span>Cloud Storage</span>
        </button>
      </div>

      <hr className="w-full border-t border-gray-300" />

      <div className="mt-4">
        {csvActive && (
          <>
            <div className="upload-container  dark:bg-[#1e1e1e] bg-[#f7f7f7] border border-gray-300 dark:border-[#4f4f4f] border-dashed">
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".csv, .xls, .xlsx"
                onChange={handleFileChange}
                className="hidden-input"
              />
              <label
                htmlFor="file-upload"
                className="drag-label dark:text-[#D3D3D3]"
              >
                Drag & drop a Excel or CSV file here, or click to browse
              </label>
            </div>
            {csvFiles.length > 0 && (<>
              <div className="flex">
                <div className="file-info dark:bg-[#1e1e1e] bg-[#f7f7f7]  border border-gray-300 dark:border-[#4f4f4f]">
                  {csvFiles.length > 0 && (
                    <div>
                      <p className="text-left text-2xl font-bold dark:text-[#D3D3D3]">
                        Documents
                      </p>

                      <div className="pdf-list mt-2 ml-2">
                        {console.log("ramm",csvFiles)}
                        {csvFiles.map((file, index) => (
                          <div key={index} className="flex items-center mb-2">
                            {/* Icon based on file type */}
                        
                            {file.type && (
                              <RiFileExcel2Fill
                                style={{
                                  color: "green",
                                  marginTop: "2px",
                                  cursor: "pointer",
                                }}
                              />
                            )}
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
                              onClick={() => handleCsvClick(file)}
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
                          <div className="mt-5">
                {/* Button and Status */}
                <button
                  className="home-button"
                  onClick={handleUpload}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Upload"}
                </button>
                {isLoading && (
                  <div className="progress-bar-container mt-3">
                    <div className="progress-bar"></div>
                  </div>
                )}
                {!isLoading && message && (
                  <p className="message-box">{message}</p> // Display the success or error message
                )}
                {!isLoading && errmessage && (
                  <p className="message-box1">{errmessage}</p> // Display the success or error message
                )}
              </div>
                      </div>
                    </div>
                  )}
                </div>
                
          <div className="pdf-info ml-2 dark:bg-[#1e1e1e] bg-[#f7f7f7]  border border-gray-300 dark:border-[#4f4f4f]">
   
   </div>
              </div>
             
              </>
            )}
         
          </>
        )}
        {databaseActive && (
          <div>Database Connection Content: Connect to your database here.</div>
        )}
        {cloudActive && (
          <div>Cloud Storage Content: Manage your cloud storage services.</div>
        )}
      </div>
    </div>
  );
};

export default DataConnection;
