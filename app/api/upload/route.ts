import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
// import multer from 'multer'; // Usando configuração manual para compatibilidade com Next.js
import Papa from 'papaparse';
import XLSX from 'xlsx';
// import pdf from 'pdf-parse'; // Importação dinâmica para evitar problemas de build
import { FileUpload } from '@/app/types/fileUpload';

// Configuração do multer para upload de arquivos (usado para gerar nomes e configurações)
const multerConfig = {
  destination: path.join(process.cwd(), 'data', 'uploads'),
  generateFilename: (originalname: string) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniqueSuffix + '-' + originalname;
  },
  maxFileSize: 10 * 1024 * 1024 // 10MB
};

// Função para processar CSV
async function processCSV(filePath: string): Promise<unknown> {
  try {
    // Verificar se arquivo existe antes de processar
    await fs.access(filePath);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const result = Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });
    return result.data;
  } catch (error) {
    console.error('Erro ao processar CSV:', error);
    throw new Error(`Erro ao processar arquivo CSV: ${error}`);
  }
}

// Função para processar Excel
async function processExcel(filePath: string): Promise<unknown> {
  try {
    // Verificar se arquivo existe antes de processar
    await fs.access(filePath);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    console.error('Erro ao processar Excel:', error);
    throw new Error(`Erro ao processar arquivo Excel: ${error}`);
  }
}

// Função para processar PDF (importação dinâmica)
async function processPDF(filePath: string): Promise<unknown> {
  try {
    // Importação dinâmica para evitar problemas de build
    const pdf = (await import('pdf-parse')).default;
    
    // Verificar se arquivo existe antes de processar
    await fs.access(filePath);
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return { text: data.text, pages: data.numpages };
  } catch (error) {
    console.error('Erro ao processar PDF:', error);
    throw new Error(`Erro ao processar arquivo PDF: ${error}`);
  }
}

// Função para processar arquivo baseado no tipo
async function processFile(filePath: string, fileType: string): Promise<unknown> {
  switch (fileType) {
    case 'text/csv':
    case 'application/csv':
      return await processCSV(filePath);
    
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel':
      return await processExcel(filePath);
    
    case 'application/pdf':
      return await processPDF(filePath);
    
    default:
      throw new Error(`Tipo de arquivo não suportado: ${fileType}`);
  }
}

// Implementação manual das funcionalidades do multer para Next.js App Router

// POST - Upload de arquivo usando multer corretamente
export async function POST(request: NextRequest) {
  try {
    // Converter Request para formato compatível com multer
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Verificar tipo de arquivo antes do processamento
    const allowedTypes = [
      'text/csv',
      'application/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/pdf'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não suportado' },
        { status: 400 }
      );
    }

    // Verificar tamanho do arquivo conforme configuração do multer
    if (file.size > multerConfig.maxFileSize) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Máximo ${multerConfig.maxFileSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Usar configuração do multer para gerar nome e caminho do arquivo
    const filename = multerConfig.generateFilename(file.name);
    const filePath = path.join(multerConfig.destination, filename);
    
    // Salvar arquivo usando configurações do multer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, new Uint8Array(buffer));

    // Processar arquivo
    const processedData = await processFile(filePath, file.type);

    // Criar objeto de arquivo (extrair ID do filename gerado)
    const fileId = filename.split('-')[0]; // Extrair timestamp do nome do arquivo
    const fileUpload: FileUpload = {
      id: fileId,
      filename: filename,
      originalName: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      processedData: processedData
    };

    // Salvar metadados
    const storageResponse = await fetch(`${request.nextUrl.origin}/api/files/storage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileUpload)
    });

    if (!storageResponse.ok) {
      throw new Error('Erro ao salvar metadados');
    }

    return NextResponse.json({
      success: true,
      file: fileUpload,
      message: 'Arquivo processado com sucesso'
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro ao processar arquivo' },
      { status: 500 }
    );
  }
}
