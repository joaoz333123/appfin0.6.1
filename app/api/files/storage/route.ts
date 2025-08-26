import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { FileStorage, FileUpload } from '@/app/types/fileUpload';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'file-storage.json');

// Função para ler storage
async function readStorage(): Promise<FileStorage> {
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Se arquivo não existe, retorna estrutura padrão
    return { files: [], sessionId: 'default' };
  }
}

// Função para escrever storage
async function writeStorage(storage: FileStorage): Promise<void> {
  await fs.writeFile(STORAGE_FILE, JSON.stringify(storage, null, 2));
}

// GET - Listar arquivos
export async function GET() {
  try {
    const storage = await readStorage();
    return NextResponse.json(storage);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao ler storage de arquivos' },
      { status: 500 }
    );
  }
}

// POST - Adicionar arquivo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // VALIDAÇÃO DE DADOS OBRIGATÓRIOS
    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json(
        { error: 'ID é obrigatório e deve ser string' },
        { status: 400 }
      );
    }
    
    if (!body.filename || typeof body.filename !== 'string') {
      return NextResponse.json(
        { error: 'Filename é obrigatório e deve ser string' },
        { status: 400 }
      );
    }
    
    if (!body.originalName || typeof body.originalName !== 'string') {
      return NextResponse.json(
        { error: 'OriginalName é obrigatório e deve ser string' },
        { status: 400 }
      );
    }
    
    if (!body.size || typeof body.size !== 'number') {
      return NextResponse.json(
        { error: 'Size é obrigatório e deve ser number' },
        { status: 400 }
      );
    }
    
    if (!body.type || typeof body.type !== 'string') {
      return NextResponse.json(
        { error: 'Type é obrigatório e deve ser string' },
        { status: 400 }
      );
    }
    
    if (!body.uploadedAt || typeof body.uploadedAt !== 'string') {
      return NextResponse.json(
        { error: 'UploadedAt é obrigatório e deve ser string ISO' },
        { status: 400 }
      );
    }
    
    const storage = await readStorage();
    
    // Verificar se ID já existe
    const existingFile = storage.files.find(f => f.id === body.id);
    if (existingFile) {
      return NextResponse.json(
        { error: 'Arquivo com este ID já existe' },
        { status: 409 }
      );
    }
    
    const newFile: FileUpload = {
      id: body.id,
      filename: body.filename,
      originalName: body.originalName,
      size: body.size,
      type: body.type,
      uploadedAt: body.uploadedAt,
      processedData: body.processedData,
      analysis: body.analysis
    };
    
    storage.files.push(newFile);
    await writeStorage(storage);
    
    return NextResponse.json({ success: true, file: newFile });
  } catch (error) {
    console.error('Erro detalhado no storage:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar arquivo', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar arquivo (para adicionar análise)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const storage = await readStorage();
    
    const fileIndex = storage.files.findIndex(f => f.id === body.id);
    if (fileIndex === -1) {
      return NextResponse.json(
        { error: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }
    
    storage.files[fileIndex] = {
      ...storage.files[fileIndex],
      ...body
    };
    
    await writeStorage(storage);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar arquivo' },
      { status: 500 }
    );
  }
}
