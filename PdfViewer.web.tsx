import React from "react";

export default function PdfViewer() {
  const pdfUrl = require("./assets/ielts-writing.pdf");

  return (
    <iframe
      src={pdfUrl}
      title="IELTS Writing Course PDF"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
        backgroundColor: "#dfe3e8",
      }}
    />
  );
}