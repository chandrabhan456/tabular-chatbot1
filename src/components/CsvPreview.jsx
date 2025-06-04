import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const CsvPreview = ({ csvFile }) => {
  const [data, setData] = useState([]);

  const parseCsv = (file) => {
    if (file && file.type === 'text/csv') {
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data);
        },
        header: true,
      });
    } else {
      console.error("The selected file is not a CSV file.");
    }
  };

  useEffect(() => {
    parseCsv(csvFile);
  }, [csvFile]);

  return (
    <div className="csv-info ml-2 dark:bg-[#1e1e1e] bg-[#f7f7f7] border border-gray-300 dark:border-[#4f4f4f]">
      {csvFile ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No CSV selected</p>
      )}
    </div>
  );
};

export default CsvPreview;
