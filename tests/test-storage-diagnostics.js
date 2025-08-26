// DIAGNÓSTICO COMPLETO DO STORAGE - BUSCAR PROBLEMAS
// Data: 2024-12-25
// Objetivo: Identificar todos os problemas do sistema de storage

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

console.log('🔍 === DIAGNÓSTICO COMPLETO DO STORAGE ===');
console.log('📅 Data:', new Date().toLocaleString());

// TESTE 1: Verificar estrutura de arquivos
console.log('\n1️⃣ TESTE: Estrutura de arquivos');
async function testFileStructure() {
  console.log('\n📁 Verificando estrutura...');
  
  try {
    // Verificar pasta uploads
    const uploadsPath = path.join(process.cwd(), 'data', 'uploads');
    await fs.access(uploadsPath);
    console.log('✅ /data/uploads/ existe');
    
    // Listar conteúdo da pasta uploads
    const uploadsContent = await fs.readdir(uploadsPath);
    console.log('📂 Conteúdo uploads:', uploadsContent.length, 'arquivos');
    if (uploadsContent.length > 0) {
      uploadsContent.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`);
      });
    }
    
    // Verificar arquivo storage
    const storagePath = path.join(process.cwd(), 'data', 'file-storage.json');
    await fs.access(storagePath);
    console.log('✅ /data/file-storage.json existe');
    
    // Ler conteúdo do storage
    const storageContent = await fs.readFile(storagePath, 'utf-8');
    const storage = JSON.parse(storageContent);
    console.log('📄 Storage atual:', JSON.stringify(storage, null, 2));
    
  } catch (error) {
    console.error('❌ Erro na estrutura:', error.message);
  }
}

// TESTE 2: Verificar permissões de escrita
console.log('\n2️⃣ TESTE: Permissões de escrita');
async function testWritePermissions() {
  console.log('\n✍️ Testando permissões...');
  
  try {
    // Testar escrita na pasta uploads
    const testFilePath = path.join(process.cwd(), 'data', 'uploads', 'test-write.txt');
    await fs.writeFile(testFilePath, 'teste de escrita');
    console.log('✅ Escrita em /data/uploads/ funcionando');
    
    // Remover arquivo de teste
    await fs.unlink(testFilePath);
    console.log('✅ Remoção de arquivo funcionando');
    
    // Testar escrita no storage
    const storagePath = path.join(process.cwd(), 'data', 'file-storage.json');
    const backup = await fs.readFile(storagePath, 'utf-8');
    
    await fs.writeFile(storagePath, backup);
    console.log('✅ Escrita em file-storage.json funcionando');
    
  } catch (error) {
    console.error('❌ Erro de permissões:', error.message);
  }
}

// TESTE 3: API GET - Verificar leitura
console.log('\n3️⃣ TESTE: API GET');
function testApiGet() {
  return new Promise((resolve, reject) => {
    console.log('\n📡 Testando GET /api/files/storage...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/files/storage',
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      console.log('📊 Status Code:', res.statusCode);
      console.log('📋 Headers:', res.headers);
      
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const result = JSON.parse(data);
            console.log('✅ GET funcionando');
            console.log('📄 Dados recebidos:', result);
            resolve(result);
          } else {
            console.error('❌ GET falhou - Status:', res.statusCode);
            console.error('❌ Resposta:', data);
            reject(new Error(`Status ${res.statusCode}: ${data}`));
          }
        } catch (error) {
          console.error('❌ Erro ao parsear JSON:', error.message);
          console.error('❌ Dados brutos:', data);
          reject(error);
        }
      });
    });

    req.on('timeout', () => {
      console.error('❌ Timeout na requisição GET');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.on('error', (error) => {
      console.error('❌ Erro na requisição GET:', error.message);
      reject(error);
    });

    req.end();
  });
}

// TESTE 4: API POST - Verificar escrita (casos diferentes)
console.log('\n4️⃣ TESTE: API POST (múltiplos casos)');
async function testApiPost() {
  console.log('\n📤 Testando POST /api/files/storage...');
  
  // CASO 1: Dados válidos simples
  await testPostCase('Caso 1 - Dados simples', {
    id: 'test001',
    filename: 'simples.csv',
    originalName: 'teste-simples.csv',
    size: 100,
    type: 'text/csv',
    uploadedAt: new Date().toISOString(),
    processedData: [{ nome: 'João', idade: 25 }]
  });
  
  // CASO 2: Dados com caracteres especiais
  await testPostCase('Caso 2 - Caracteres especiais', {
    id: 'test002',
    filename: 'especiais.csv',
    originalName: 'teste-ção-ã.csv',
    size: 200,
    type: 'text/csv',
    uploadedAt: new Date().toISOString(),
    processedData: [{ nome: 'José Carlos', cidade: 'São Paulo' }]
  });
  
  // CASO 3: Dados grandes
  await testPostCase('Caso 3 - Dados grandes', {
    id: 'test003',
    filename: 'grande.xlsx',
    originalName: 'planilha-grande.xlsx',
    size: 50000,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadedAt: new Date().toISOString(),
    processedData: Array.from({ length: 100 }, (_, i) => ({ 
      id: i + 1, 
      nome: `Usuario ${i + 1}`, 
      valor: Math.random() * 1000 
    }))
  });
  
  // CASO 4: Dados inválidos (para testar validação)
  await testPostCase('Caso 4 - Dados inválidos', {
    id: '', // ID vazio
    filename: 'invalido.csv',
    size: 'não-é-número', // Tipo errado
    type: 'text/csv'
    // Faltando campos obrigatórios
  });
}

function testPostCase(caseName, testData) {
  return new Promise((resolve) => {
    console.log(`\n🧪 ${caseName}:`);
    
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/files/storage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      console.log(`   📊 Status: ${res.statusCode}`);
      
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const result = JSON.parse(data);
            console.log(`   ✅ ${caseName} - Sucesso`);
            console.log(`   📄 Resultado:`, result.success ? 'Salvo' : 'Falhou');
          } else {
            console.log(`   ❌ ${caseName} - Falhou (Status ${res.statusCode})`);
            console.log(`   📄 Erro:`, data);
          }
        } catch (error) {
          console.log(`   ❌ ${caseName} - Erro JSON:`, error.message);
          console.log(`   📄 Dados brutos:`, data);
        }
        resolve();
      });
    });

    req.on('timeout', () => {
      console.log(`   ❌ ${caseName} - Timeout`);
      req.destroy();
      resolve();
    });

    req.on('error', (error) => {
      console.log(`   ❌ ${caseName} - Erro:`, error.message);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

// TESTE 5: Verificar estado final do storage
console.log('\n5️⃣ TESTE: Estado final do storage');
async function testFinalState() {
  console.log('\n📋 Verificando estado final...');
  
  try {
    // Ler storage novamente
    const storagePath = path.join(process.cwd(), 'data', 'file-storage.json');
    const storageContent = await fs.readFile(storagePath, 'utf-8');
    const storage = JSON.parse(storageContent);
    
    console.log('📊 Total de arquivos no storage:', storage.files.length);
    console.log('🆔 Session ID:', storage.sessionId);
    
    if (storage.files.length > 0) {
      console.log('\n📁 Arquivos armazenados:');
      storage.files.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.filename} (${file.type}) - ${file.size} bytes`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar estado final:', error.message);
  }
}

// EXECUTAR TODOS OS TESTES DE DIAGNÓSTICO
async function runFullDiagnostics() {
  try {
    await testFileStructure();
    await testWritePermissions();
    
    // Aguardar servidor estar pronto
    console.log('\n⏳ Aguardando servidor...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await testApiGet();
    await testApiPost();
    await testFinalState();
    
    console.log('\n🏁 === DIAGNÓSTICO COMPLETO FINALIZADO ===');
    
  } catch (error) {
    console.error('\n💥 Erro geral no diagnóstico:', error);
  }
}

runFullDiagnostics();
