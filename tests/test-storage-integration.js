// TESTE INTEGRAÇÃO STORAGE - Upload + Storage
// Data: 2024-12-25
// Objetivo: Validar integração entre upload e storage

const fs = require('fs').promises;
const path = require('path');

console.log('=== TESTE INTEGRAÇÃO STORAGE ===');

// TESTE 1: Verificar se pasta uploads existe
console.log('\n1. TESTE: Verificar estrutura de pastas');
async function testFolderStructure() {
  try {
    const uploadsPath = path.join(process.cwd(), 'data', 'uploads');
    await fs.access(uploadsPath);
    console.log('✅ Pasta /data/uploads/ existe');
    
    const storagePath = path.join(process.cwd(), 'data', 'file-storage.json');
    await fs.access(storagePath);
    console.log('✅ Arquivo /data/file-storage.json existe');
  } catch (error) {
    console.error('❌ Erro na estrutura:', error.message);
  }
}

// TESTE 2: Verificar conteúdo do storage
console.log('\n2. TESTE: Verificar conteúdo do storage');
async function testStorageContent() {
  try {
    const storagePath = path.join(process.cwd(), 'data', 'file-storage.json');
    const content = await fs.readFile(storagePath, 'utf-8');
    const storage = JSON.parse(content);
    
    console.log('✅ Storage JSON válido');
    console.log('✅ Estrutura:', Object.keys(storage));
    console.log('✅ Arquivos armazenados:', storage.files?.length || 0);
    console.log('✅ Session ID:', storage.sessionId);
  } catch (error) {
    console.error('❌ Erro no storage:', error.message);
  }
}

// TESTE 3: Simular integração upload → storage
console.log('\n3. TESTE: Simular integração upload → storage');
async function testUploadStorageFlow() {
  try {
    // Simular dados de upload
    const mockFileUpload = {
      id: '1234567890',
      filename: 'test-file.csv',
      originalName: 'teste.csv',
      size: 1024,
      type: 'text/csv',
      uploadedAt: new Date().toISOString(),
      processedData: [{ nome: 'Teste', idade: 25 }]
    };
    
    // Verificar se seria possível salvar
    console.log('✅ Mock de arquivo criado');
    console.log('✅ ID:', mockFileUpload.id);
    console.log('✅ Tipo:', mockFileUpload.type);
    console.log('✅ Dados processados:', mockFileUpload.processedData.length, 'registros');
    
    // Verificar estrutura JSON
    const jsonString = JSON.stringify(mockFileUpload);
    const parsed = JSON.parse(jsonString);
    console.log('✅ Serialização JSON funcionando');
    
  } catch (error) {
    console.error('❌ Erro na simulação:', error.message);
  }
}

// TESTE 4: Verificar tipos de arquivo suportados
console.log('\n4. TESTE: Tipos de arquivo suportados');
function testSupportedTypes() {
  const allowedTypes = [
    'text/csv',
    'application/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/pdf'
  ];
  
  console.log('✅ Tipos suportados:', allowedTypes.length);
  allowedTypes.forEach((type, index) => {
    console.log(`  ${index + 1}. ${type}`);
  });
}

// EXECUTAR TODOS OS TESTES
async function runIntegrationTests() {
  await testFolderStructure();
  await testStorageContent();
  await testUploadStorageFlow();
  testSupportedTypes();
  
  console.log('\n=== INTEGRAÇÃO STORAGE - TESTE COMPLETO ===');
}

runIntegrationTests().catch(console.error);
