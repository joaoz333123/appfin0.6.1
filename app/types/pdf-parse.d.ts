declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    info: unknown;
  }
  
  function pdf(dataBuffer: Buffer): Promise<PDFData>;
  export = pdf;
}
