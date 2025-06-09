import React, { useState,useEffect } from "react";
import "./DataConn.css";
import { IoIosClose } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import CsvPreview from './CsvPreview'; // Adjust the path accordingly
import Papa from 'papaparse';
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
   const [csvData, setCsvData] = useState([]);
    const [loading, setLoading] = useState(false);
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
  if (!fileObject) return;

  setLoading(true);
  setCsvData([]); // Reset current data before parsing a new file

  let rowCount = 0; // Initialize a counter to track the number of rows parsed

  Papa.parse(fileObject, {
    header: true,
    skipEmptyLines: true,
    worker: true, // Use a web worker for parsing
    chunk: (results, parser) => {
      const newRows = results.data;
      const remainingRows = 20 - rowCount; // Calculate remaining rows needed to reach 20

      if (remainingRows > 0) {
        // Add only the remaining rows needed to reach 20
        setCsvData((prevData) => [
          ...prevData,
          ...newRows.slice(0, remainingRows),
        ]);
        rowCount += newRows.length;

        if (rowCount >= 20) {
          parser.abort(); // Stop parsing once 20 rows have been processed
        }
      }
    },
    complete: () => {
      setLoading(false);
    },
    error: (error) => {
      console.error("Error parsing CSV file:", error);
      setLoading(false);
    },
  });
};


   useEffect(() => {
    console.log("Updated csvData:", csvData);
  }, [csvFiles,csvData]); // This will run after pdfFiles state is updated
 
 const handleUpload = async () => {
    
    setIsLoading(true);
    // Create a FormData object
    const formData = new FormData();
   
   csvFiles.forEach((file) => {
      formData.append('files', file.fileObject); // 'files' is the key used in the backend
    });
   
    try {
      const response = await fetch('http://127.0.0.1:8000/upload-csv', {
        method: 'POST',
        body: formData, // Send FormData directly
      });
   
      if (!response.ok) {
        throw new Error(`Failed to upload files: ${response.statusText}`);
      }
   
      const data = await response.json();
      setMessage(data);
      
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
    className={`flex items-center space-x-2 text-lg border px-4 py-2 rounded ${
      csvActive ? "font-bold text-black bg-blue-500 border-blue-500" : "text-gray-700 bg-white border-gray-300"
    }`}
    onClick={toggleCSV}
  >
    <span role="img" aria-label="CSV File">
      🗂️
    </span>
    <span>CSV File</span>
  </button>

  <button
    className={`flex items-center space-x-2 text-lg border px-4 py-2 rounded ${
      databaseActive ? "font-bold text-black bg-blue-500 border-blue-500" : "text-gray-700 bg-white border-gray-300"
    }`}
    onClick={toggleDatabase}
  >
    <span role="img" aria-label="Database Connection">
      💾
    </span>
    <span>Database Connection</span>
  </button>

  <button
    className={`flex items-center space-x-2 text-lg border px-4 py-2 rounded ${
      cloudActive ? "font-bold text-black bg-blue-500 border-blue-500" : "text-gray-700 bg-white border-gray-300"
    }`}
    onClick={toggleCloud}
  >
    <span role="img" aria-label="Cloud Storage">
      ☁️
    </span>
    <span>Cloud Storage</span>
  </button>
</div>


     

      <div className="mt-4">
        {csvActive && (
          <>
            <div className="upload-container mt-5 dark:bg-[#1e1e1e] bg-[#f7f7f7] border border-gray-300 dark:border-[#4f4f4f] border-dashed">
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
                Drag & drop file here, or click to browse
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
  <div key={index} className="flex  mb-2">
    {/* Icon based on file type */}
    <div className=" ">
      {file.type && (
        <RiFileExcel2Fill
          style={{
            color: "green",
            marginTop: "4px",
         
            width: "100%", // Use 100% width to fill the allocated space
          }}
        />
      )}
    </div>
    
    {/* File Name */}
    <p
      className="ml-2 text-left truncate dark:text-[#d3d3d3] text-black"
      style={{
        cursor: "pointer",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: '50%', // Set width to 20% as specified
        margin:'0',
        marginLeft:'0px'
      }}
     
    >
      {file.name}
    </p>
    
    {/* Preview File Button */}
    <button
      className="ml-1 text-center text-white bg-blue-500 border border-blue-700 rounded "
      style={{
        cursor: "pointer",
        width: '20%', // Set width to 20% for the button
      }}
       onClick={() => handleCsvClick(file.fileObject)}
    >
      Preview
    </button>

    {/* Remove File Button */}
    <button
      className="ml-1 text-left text-white bg-red-500 border border-red-700 rounded p-0.1 flex items-center justify-center"
      style={{
        cursor: "pointer",
        width: '20%', // Set width to 20% for the button
      }}
      onClick={() => handleCsvRemove(file)}
    >      

      Remove
    </button>
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
                  <p className="message-box" style={{
                                overflow: "hidden", // Prevent overflowing text
                                whiteSpace: "nowrap", // Prevent wrapping to the next line
                                textOverflow: "ellipsis", // Add ellipsis for overflow
                                maxWidth: "98%", // Adjust the width as needed
                              }} >{message}</p> // Display the success or error message
                )}
                {!isLoading && errmessage && (
                  <p className="message-box1 text-red-400">{errmessage}</p> // Display the success or error message
                )}
              </div>
                      </div>
                    </div>
                  )}
                </div>
                
          <div className="pdf-info ml-2 dark:bg-[#1e1e1e] bg-[#f7f7f7]  border border-gray-300 dark:border-[#4f4f4f]">
       {loading && <p>Loading...</p>}
      {csvData.length > 0 && (
        <div style={{  padding: '10px' }}>
         
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((header, index) => (
                  <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
