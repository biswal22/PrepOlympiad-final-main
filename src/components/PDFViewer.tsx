'use client';
import { useState } from 'react';

interface PDFViewerProps {
  pdfPath: string;
}

export default function PDFViewer({ pdfPath }: PDFViewerProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-[80vh]">
        <object
          data={pdfPath}
          type="application/pdf"
          className="w-full h-full"
        >
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-700 p-4">
            <p>Unable to display PDF. Please check that the file exists and the path is correct.</p>
          </div>
        </object>
      </div>
    </div>
  );
} 