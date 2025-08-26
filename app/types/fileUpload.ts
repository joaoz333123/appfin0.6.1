export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  uploadedAt: string;
  processedData?: unknown; // Dados extraídos
  analysis?: string; // Análise da IA
}

export interface FileStorage {
  files: FileUpload[];
  sessionId: string;
}
