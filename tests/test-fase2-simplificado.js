/**
 * TESTE SIMPLIFICADO DA FASE 2
 * 
 * Teste mais direto e tolerante para validar funcionalidades básicas
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  timeout: 15000
};

// Função para fazer requisição HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      method: 'GET',
      timeout: TEST_CONFIG.timeout,
      headers: {
        'User-Agent': 'Fase2-Test/1.0'
      }
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    const req = http.request(url, finalOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (finalOptions.body) {
      req.write(finalOptions.body);
    }
    
    req.end();
  });
}

// Função para upload simplificado
async function uploadSimples(fileName, content, contentType) {
  try {
    const boundary = '----simple-test-' + Date.now();
    
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${contentType}\r\n\r\n`;
    const footer = `\r\n--${boundary}--\r\n`;
    
    const body = Buffer.concat([
      Buffer.from(header),
      Buffer.from(content),
      Buffer.from(footer)
    ]);
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/upload',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': body.length
        },
        timeout: TEST_CONFIG.timeout
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode,
              body: res.statusCode === 200 ? JSON.parse(data) : data
            });
          } catch (error) {
            resolve({
              statusCode: res.statusCode,
              body: data
            });
          }
        });
      });

      req.on('error', reject);
      req.write(body);
      req.end();
    });
    
  } catch (error) {
    throw new Error(`Erro no upload: ${error.message}`);
  }
}

// Função para testar chat
async function testarChat(mensagem) {
  try {
    console.log(`🤖 Testando chat: "${mensagem}"`);
    
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mensagem })
    });

    console.log(`📊 Chat response status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      try {
        const data = JSON.parse(response.body);
        const resposta = data.reply || data.response;
        console.log(`✅ Chat funcionando: ${resposta ? 'SIM' : 'NÃO'}`);
        return resposta;
      } catch (e) {
        console.log(`❌ Chat response inválido: ${response.body}`);
        return null;
      }
    } else {
      console.log(`❌ Chat falhou: ${response.statusCode} - ${response.body}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Erro no chat: ${error.message}`);
    return null;
  }
}

async function executarTeste() {
  console.log('🚀 TESTE SIMPLIFICADO DA FASE 2');
  console.log('=' .repeat(50));
  
  const resultados = {
    chatBasico: false,
    uploadCSV: false,
    storageAPI: false,
    problemas: []
  };
  
  // 1. Testar chat básico
  console.log('\n1️⃣ TESTANDO CHAT BÁSICO...');
  const respostaChat = await testarChat('Olá, teste simples');
  resultados.chatBasico = !!respostaChat;
  
  // 2. Testar upload CSV
  console.log('\n2️⃣ TESTANDO UPLOAD CSV...');
  try {
    const csvContent = 'nome,idade\nJoão,30\nMaria,25';
    const uploadResult = await uploadSimples('test.csv', csvContent, 'text/csv');
    
    console.log(`📊 Upload status: ${uploadResult.statusCode}`);
    
    if (uploadResult.statusCode === 200) {
      console.log('✅ Upload CSV: SUCESSO');
      console.log(`📄 Dados processados: ${uploadResult.body.file ? 'SIM' : 'NÃO'}`);
      resultados.uploadCSV = true;
    } else {
      console.log(`❌ Upload CSV falhou: ${uploadResult.body}`);
      resultados.problemas.push(`Upload CSV: ${uploadResult.statusCode}`);
    }
  } catch (error) {
    console.log(`❌ Erro no upload: ${error.message}`);
    resultados.problemas.push(`Upload erro: ${error.message}`);
  }
  
  // 3. Testar storage API
  console.log('\n3️⃣ TESTANDO STORAGE API...');
  try {
    const storageResponse = await makeRequest(`${TEST_CONFIG.baseUrl}/api/files/storage`);
    console.log(`📊 Storage status: ${storageResponse.statusCode}`);
    
    if (storageResponse.statusCode === 200) {
      const data = JSON.parse(storageResponse.body);
      console.log(`✅ Storage funcionando - ${data.files.length} arquivos`);
      resultados.storageAPI = true;
    } else {
      console.log(`❌ Storage falhou: ${storageResponse.statusCode}`);
      resultados.problemas.push(`Storage: ${storageResponse.statusCode}`);
    }
  } catch (error) {
    console.log(`❌ Erro no storage: ${error.message}`);
    resultados.problemas.push(`Storage erro: ${error.message}`);
  }
  
  // Resultados finais
  console.log('\n📊 RESULTADOS FINAIS:');
  console.log('-'.repeat(30));
  console.log(`💬 Chat básico: ${resultados.chatBasico ? '✅ OK' : '❌ FALHA'}`);
  console.log(`📤 Upload CSV: ${resultados.uploadCSV ? '✅ OK' : '❌ FALHA'}`);
  console.log(`💾 Storage API: ${resultados.storageAPI ? '✅ OK' : '❌ FALHA'}`);
  
  const sucessos = Object.values(resultados).filter(v => v === true).length - 1; // -1 pois problemas não é boolean
  const total = 3;
  const percentual = Math.round((sucessos / total) * 100);
  
  console.log(`\n📈 SUCESSO: ${percentual}% (${sucessos}/${total})`);
  
  if (resultados.problemas.length > 0) {
    console.log('\n🚨 PROBLEMAS:');
    resultados.problemas.forEach(p => console.log(`  - ${p}`));
  }
  
  if (percentual >= 67) {
    console.log('\n🎉 FUNCIONALIDADE BÁSICA FUNCIONANDO!');
    console.log('✨ Principais componentes da Fase 2 operacionais');
  } else {
    console.log('\n⚠️ PROBLEMAS CRÍTICOS IDENTIFICADOS');
  }
  
  return percentual >= 67;
}

// Executar
executarTeste()
  .then(sucesso => {
    console.log('\n' + '='.repeat(50));
    if (sucesso) {
      console.log('🎯 TESTE CONCLUÍDO - FASE 2 FUNCIONAL!');
      process.exit(0);
    } else {
      console.log('⚠️ TESTE CONCLUÍDO - PROBLEMAS ENCONTRADOS!');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n💥 ERRO FATAL:', error.message);
    process.exit(1);
  });
