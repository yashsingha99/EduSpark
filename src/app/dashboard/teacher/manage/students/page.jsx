"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
const apiKey = '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';

function Page() {
  const [file, setFile] = useState(null);
  const [studentsData, setStudentsData] = useState([]);

  const handleUpload = async (e) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const recipients = event.target.result;
      const workbook = XLSX.read(recipients, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setStudentsData(jsonData);
      // console.log(jsonData);
      // const r =  jsonData.map((email) => email.email);
      // console.log(r);
      
      const url = `https://api.brevo.com/v3/smtp/email`;
      const data =  jsonData.map((email) => email.email)
      //   templateId : 2,
      // };

      const options = {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      };

      try {
        const response = await axios.post(url, data, options);
        // const res = await axios.post("http://localhost:3000/api/email", {
        //   recipients: jsonData,
        //   subject: "Welcome to EduSpark - Your Learning Journey Begins!",
        //   body: `
        //     <h2>Welcome to EduSpark!</h2>
        //     <p>Dear Student,</p>
        //     <p>We're excited to have you join our learning community. Your account has been successfully created.</p>
        //     <p>Best regards,<br>EduSpark Team</p>
        //   `,
        // });
      if (response.status === 201) {
      return true; 
    } else {
      console.error("Unexpected response status from Brevo API:", response.status);
      return false; 
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false; 
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
