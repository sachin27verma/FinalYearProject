"use client";

import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, RefreshCcw, Eye, EyeOff } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import Tesseract from "tesseract.js";
import FloatingWords from "@/utils/FloatingWords";
import Header from "@/utils/Header";

export default function TextExtractor() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state for loading bar
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [showText, setShowText] = useState(false); // Toggle to show/hide extracted text
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const extractText = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setExtractedText("");
    setError("");

    try {
      if (file.type === "application/pdf") {
        await processPdf(file);
      } else {
        await processImage(file);
      }
      simulateAnalysis(); // Start analysis after text extraction
    } catch (err) {
      setError("Error extracting text: " + err.message);
      setIsLoading(false);
    }
  };

  const processImage = async (imageFile) => {
    const image = URL.createObjectURL(imageFile);
    const { data: { text } } = await Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    });
    setExtractedText(text);
  };

  const processPdf = async (pdfFile) => {
    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const numPages = pdfDoc.getPages().length;
    let extractedText = "";

    for (let i = 0; i < numPages; i++) {
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      // Render PDF page to canvas (this requires additional setup)
      const imageData = canvas.toDataURL();
      const { data: { text } } = await Tesseract.recognize(imageData, "eng");
      extractedText += text + "\n";
    }
    setExtractedText(extractedText);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false); // Analysis done
          setIsLoading(false);
        }
        return prev + 10;
      });
    }, 300); // Simulate progress every 300ms
  };

  const handleRefresh = () => {
    setFile(null);
    setExtractedText("");
    setError("");
    setProgress(0);
    setIsLoading(false);
    setIsAnalyzing(false);
    setShowText(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-gray-900 rounded-lg shadow-xl p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-500 mb-8">
              Automated Fake News Detection
            </h1>

            <div className="mb-6">
              <div
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPEG, or PDF</p>
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>
              )}
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-between mb-4">
              <button
                onClick={extractText}
                disabled={!file || isLoading || isAnalyzing}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
                  !file || isLoading || isAnalyzing
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                } transition-all duration-300 ease-in-out flex items-center justify-center mr-2`}
              >
                {isLoading || isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLoading ? "Extracting..." : "Analyzing..."}
                  </>
                ) : (
                  <>
                    <FileText className="mr-2" />
                    Extract Text
                  </>
                )}
              </button>

              <button
                onClick={handleRefresh}
                className="p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors flex items-center"
              >
                <RefreshCcw className="h-5 w-5" />
              </button>
            </div>

            {isLoading && (
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {!isLoading && extractedText && !isAnalyzing && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">Analysis Complete</h2>
                <button
                  className="p-3 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors flex items-center"
                  onClick={() => setShowText(!showText)}
                >
                  {showText ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
                  {showText ? "Hide Extracted Text" : "Show Extracted Text"}
                </button>
                {showText && (
                  <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto mt-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{extractedText}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
