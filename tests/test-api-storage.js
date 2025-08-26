// TESTE API STORAGE VIA CÓDIGO
// Data: 2024-12-25
// Objetivo: Testar API de storage programaticamente

const http = require('http');

console.log('=== TESTE API STORAGE ===');

// TESTE 1: GET Storage
function testGetStorage() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/files/storage',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('\n1. GET Storage:');
          console.log('✅ Status:', res.statusCode);
          console.log('✅ Resposta:', result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// TESTE 2: POST Storage
function testPostStorage() {
  return new Promise((resolve, reject) => {
    const testData = {
      id: 'test123',
      filename: 'test.csv',
      originalName: 'teste.csv',
      size: 1024,
      type: 'text/csv',
      uploadedAt: new Date().toISOString(),
      processedData: [{ nome: 'Teste', idade: 25 }]
    };

    const postData = JSON.stringify(testData);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/files/storage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('\n2. POST Storage:');
          console.log('✅ Status:', res.statusCode);
          console.log('✅ Resposta:', result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// EXECUTAR TESTES
async function runApiTests() {
  try {
    await testGetStorage();
    await testPostStorage();
    
    // Verificar novamente se foi salvo
    await testGetStorage();
    
    console.log('\n=== API STORAGE - TESTE COMPLETO ===');
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Aguardar servidor estar pronto
setTimeout(() => {
  runApiTests();
}, 2000);
