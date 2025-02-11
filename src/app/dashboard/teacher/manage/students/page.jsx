"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

function Page() {
  const [file, setFile] = useState(null);
  const [studentsData, setStudentsData] = useState([]);

  const handleUpload = async (e) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setStudentsData(jsonData);

      try {
        const res = await axios.post("http://localhost:8000/massAddStudent", {
          students: jsonData,
        });
        console.log(res);
      } catch (error) {
        console.error("Error uploading students:", error);
      }
    };

    reader.readAsBinaryString(file);
  };


  return (
    <div>
      <h1>Upload Excel File</h1>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".xls,.xlsx"
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleUpload}
        >
          Upload
        </button>

        {studentsData.length > 0 && (
          <div>
            <h2>Parsed Student Data:</h2>
            <pre>{JSON.stringify(studentsData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
