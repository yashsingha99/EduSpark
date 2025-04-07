import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FILE_SVG from "../../../../../Assets/icons/pdf-svgrepo-com.svg";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

// Set pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"
  // `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function DocumentUpload({ setMethod }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleGenerate = async () => {
    if (!file) {
      alert("Please upload a document first.");
      return;
    }

    const fileType = file.type;

    if (fileType === "application/pdf") {
      extractTextFromPDF(file);
    } else if (fileType.startsWith("image/")) {
      extractTextFromImage(file);
    } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      extractTextFromDocx(file);
    } else if (fileType === "text/plain") {
      extractTextFromTxt(file);
    } else if (fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      extractTextFromExcel(file);
    } else {
      alert("Unsupported file type. Please upload a PDF, image, Word, Excel, or text file.");
    }
  };

  // 🔹 Extract text from PDFs (Text-based)
  const extractTextFromPDF = async (pdfFile) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(pdfFile);
    fileReader.onload = async () => {
      const pdf = await pdfjsLib.getDocument({ data: fileReader.result }).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        textContent.items.forEach((item) => {
          extractedText += item.str + " ";
        });
      }

      setText(extractedText || "No text found in the document.");
    };
  };

  // 🔹 Extract text from images using OCR (Tesseract.js)
  const extractTextFromImage = async (imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    Tesseract.recognize(imageUrl, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setText(text || "No text found in the image.");
    });
  };

  // 🔹 Extract text from Word Documents (.docx)
  const extractTextFromDocx = async (docxFile) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(docxFile);
    reader.onload = async (event) => {
      const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
      setText(result.value || "No text found in the document.");
    };
  };

  // 🔹 Extract text from plain text files (.txt)
  const extractTextFromTxt = async (txtFile) => {
    const reader = new FileReader();
    reader.readAsText(txtFile);
    reader.onload = () => {
      setText(reader.result || "No text found in the file.");
    };
  };

  // 🔹 Extract text from Excel Files (.xls, .xlsx)
  const extractTextFromExcel = async (excelFile) => {
    const reader = new FileReader();
    reader.readAsBinaryString(excelFile);
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      let extractedText = "";

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        extractedText += XLSX.utils.sheet_to_csv(sheet);
      });

      setText(extractedText || "No data found in the spreadsheet.");
    };
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <button
        className="text-purple-950 w-20 h-10 rounded-md transition-colors mt-10 ml-10 flex justify-center items-center opacity-70 hover:opacity-100"
        onClick={() => setMethod(0)}
      >
        <ArrowBackOutlinedIcon />
        <h1 className="ml-1 font-rubik font-bold">Back</h1>
      </button>
      <div className="flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-rubik font-bold mb-4 flex border-b-4 w-2/3 items-center justify-center border-purple-300 rounded">
          <span>Create Quizzes from</span>
          <img src={FILE_SVG} className="w-20 p-3" />
          <span>Documents</span>
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex items-center">
          <form className="w-full">
            <label htmlFor="document-upload" className="sr-only">
              Upload Document
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DescriptionOutlinedIcon style={{ color: "grey" }} />
              </div>
              <input
                type="file"
                id="document-upload"
                accept=".pdf, .docx, .txt, .xls, .xlsx, image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full p-4 pl-12 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Upload your document"
                required
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleGenerate();
                }}
                type="button"
                className="text-white absolute right-2 bottom-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 bg-blue-900"
              >
                Generate Quiz
              </button>
            </div>
          </form>
        </div>
        <p className="text-bold text-black mt-4">{text}</p>
      </div>
    </div>
  );
}

export default DocumentUpload;
