import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyPdfDocument from './MyPdfDocument ';

const PdfExporter = () => {
  return (
    <div>
      <PDFViewer width="1000" height="600"> {/* Adjust width and height as needed */}
        <MyPdfDocument/>
      </PDFViewer>
    </div>
  );
};

export default PdfExporter;
