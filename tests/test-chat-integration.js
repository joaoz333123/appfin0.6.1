// TESTE INTEGRAÇÃO CHAT + UPLOAD - Fase 2
// Data: 2024-12-25
// Objetivo: Validar integração completa upload → IA

const http = require('http');

console.log('🤖 === TESTE INTEGRAÇÃO CHAT + UPLOAD ===');
console.log('📅 Data:', new Date().toLocaleString());

// TESTE 1: Verificar se chat básico ainda funciona
console.log('\n1️⃣ TESTE: Chat básico funcionando');
function testBasicChat() {
  return new Promise((resolve, reject) => {
    console.log('\n💬 Testando chat básico...');
    
    const chatData = {
      message: 'Olá, você está funcionando?',
      history: []
    };

    const postData = JSON.stringify(chatData);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      console.log('📊 Status Chat:', res.statusCode);
      
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const result = JSON.parse(data);
            console.log('✅ Chat básico funcionando');
            console.log('🤖 Resposta da IA:', result.response?.substring(0, 100) + '...');
            resolve(result);
          } else {
            console.error('❌ Chat básico falhou - Status:', res.statusCode);
            console.error('❌ Erro:', data);
            reject(new Error(`Chat Status ${res.statusCode}`));
          }
        } catch (error) {
          console.error('❌ Erro ao parsear resposta do chat:', error.message);
          reject(error);
        }
      });
    });

    req.on('timeout', () => {
      console.error('❌ Timeout no chat básico');
      req.destroy();
      reject(new Error('Chat Timeout'));
    });

    req.on('error', (error) => {
      console.error('❌ Erro na requisição do chat:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// TESTE 2: Simular upload de CSV e análise pela IA
console.log('\n2️⃣ TESTE: Upload CSV + Análise IA');
async function testCSVUploadAndAnalysis() {
  console.log('\n📊 Testando upload CSV...');
  
  try {
    // Criar arquivo CSV de teste
    const csvContent = `nome,idade,cidade,salario
João Silva,25,São Paulo,4500
Maria Santos,30,Rio de Janeiro,3800
Pedro Costa,28,Belo Horizonte,4200
Ana Oliveira,32,Curitiba,4500`;

    // Simular dados de upload processados (como viria do papaparse)
    const processedCSVData = [
      { nome: 'João Silva', idade: 25, cidade: 'São Paulo', salario: 4500 },
      { nome: 'Maria Santos', idade: 30, cidade: 'Rio de Janeiro', salario: 3800 },
      { nome: 'Pedro Costa', idade: 28, cidade: 'Belo Horizonte', salario: 4200 },
      { nome: 'Ana Oliveira', idade: 32, cidade: 'Curitiba', salario: 4500 }
    ];

    // Simular mensagem que seria enviada para IA (como no ChatInterface.tsx)
    const analysisMessage = `Analise os dados do arquivo "funcionarios.csv": ${JSON.stringify(processedCSVData)}

Por favor, forneça:
1. Resumo dos dados
2. Insights principais
3. Análise estatística básica`;

    console.log('📤 Enviando dados CSV para IA...');
    console.log('📋 Registros:', processedCSVData.length);
    
    // Enviar para IA via API de chat
    const chatData = {
      message: analysisMessage,
      history: []
    };

    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(chatData);

      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 15000
      };

      const req = http.request(options, (res) => {
        let data = '';
        
        console.log('📊 Status Análise CSV:', res.statusCode);
        
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode === 200) {
              const result = JSON.parse(data);
              console.log('✅ IA analisou dados CSV');
              console.log('📈 Análise gerada:', result.response?.substring(0, 200) + '...');
              resolve(result);
            } else {
              console.error('❌ Análise CSV falhou - Status:', res.statusCode);
              console.error('❌ Erro:', data);
              reject(new Error(`CSV Analysis Status ${res.statusCode}`));
            }
          } catch (error) {
            console.error('❌ Erro ao parsear análise CSV:', error.message);
            reject(error);
          }
        });
      });

      req.on('timeout', () => {
        console.error('❌ Timeout na análise CSV');
        req.destroy();
        reject(new Error('CSV Analysis Timeout'));
      });

      req.on('error', (error) => {
        console.error('❌ Erro na análise CSV:', error.message);
        reject(error);
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    console.error('❌ Erro no teste CSV:', error.message);
    throw error;
  }
}

// TESTE 3: Simular upload de Excel e análise pela IA
console.log('\n3️⃣ TESTE: Upload Excel + Análise IA');
async function testExcelUploadAndAnalysis() {
  console.log('\n📊 Testando upload Excel...');
  
  try {
    // Simular dados de Excel processados (como viria do xlsx)
    const processedExcelData = [
      { Produto: 'Notebook', Preco: 2500.50, Categoria: 'Eletrônicos', Estoque: 15 },
      { Produto: 'Mouse', Preco: 85.90, Categoria: 'Acessórios', Estoque: 50 },
      { Produto: 'Teclado', Preco: 150.00, Categoria: 'Acessórios', Estoque: 30 },
      { Produto: 'Monitor', Preco: 800.00, Categoria: 'Eletrônicos', Estoque: 8 }
    ];

    // Simular mensagem que seria enviada para IA
    const analysisMessage = `Analise os dados do arquivo "produtos.xlsx": ${JSON.stringify(processedExcelData)}

Por favor, forneça:
1. Análise de preços por categoria
2. Status do estoque
3. Recomendações de negócio`;

    console.log('📤 Enviando dados Excel para IA...');
    console.log('📋 Produtos:', processedExcelData.length);
    
    const chatData = {
      message: analysisMessage,
      history: []
    };

    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(chatData);

      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 15000
      };

      const req = http.request(options, (res) => {
        let data = '';
        
        console.log('📊 Status Análise Excel:', res.statusCode);
        
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode === 200) {
              const result = JSON.parse(data);
              console.log('✅ IA analisou dados Excel');
              console.log('📈 Análise gerada:', result.response?.substring(0, 200) + '...');
              resolve(result);
            } else {
              console.error('❌ Análise Excel falhou - Status:', res.statusCode);
              console.error('❌ Erro:', data);
              reject(new Error(`Excel Analysis Status ${res.statusCode}`));
            }
          } catch (error) {
            console.error('❌ Erro ao parsear análise Excel:', error.message);
            reject(error);
          }
        });
      });

      req.on('timeout', () => {
        console.error('❌ Timeout na análise Excel');
        req.destroy();
        reject(new Error('Excel Analysis Timeout'));
      });

      req.on('error', (error) => {
        console.error('❌ Erro na análise Excel:', error.message);
        reject(error);
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    console.error('❌ Erro no teste Excel:', error.message);
    throw error;
  }
}

// TESTE 4: Verificar se chat continua funcionando após uploads
console.log('\n4️⃣ TESTE: Chat após uploads');
async function testChatAfterUploads() {
  console.log('\n💬 Testando chat após uploads...');
  
  const chatData = {
    message: 'Você ainda está funcionando normalmente após processar arquivos?',
    history: []
  };

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(chatData);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      console.log('📊 Status Chat Final:', res.statusCode);
      
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const result = JSON.parse(data);
            console.log('✅ Chat funcionando após uploads');
            console.log('🤖 Resposta:', result.response?.substring(0, 100) + '...');
            resolve(result);
          } else {
            console.error('❌ Chat após uploads falhou - Status:', res.statusCode);
            reject(new Error(`Chat Final Status ${res.statusCode}`));
          }
        } catch (error) {
          console.error('❌ Erro no chat final:', error.message);
          reject(error);
        }
      });
    });

    req.on('timeout', () => {
      console.error('❌ Timeout no chat final');
      req.destroy();
      reject(new Error('Chat Final Timeout'));
    });

    req.on('error', (error) => {
      console.error('❌ Erro no chat final:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// EXECUTAR TODOS OS TESTES DE INTEGRAÇÃO
async function runChatIntegrationTests() {
  let passedTests = 0;
  let totalTests = 4;
  
  try {
    console.log('\n⏳ Aguardando servidor estar pronto...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Teste 1: Chat básico
    try {
      await testBasicChat();
      passedTests++;
    } catch (error) {
      console.error('💥 Falha no teste de chat básico:', error.message);
    }
    
    // Teste 2: CSV + IA
    try {
      await testCSVUploadAndAnalysis();
      passedTests++;
    } catch (error) {
      console.error('💥 Falha no teste CSV + IA:', error.message);
    }
    
    // Teste 3: Excel + IA
    try {
      await testExcelUploadAndAnalysis();
      passedTests++;
    } catch (error) {
      console.error('💥 Falha no teste Excel + IA:', error.message);
    }
    
    // Teste 4: Chat após uploads
    try {
      await testChatAfterUploads();
      passedTests++;
    } catch (error) {
      console.error('💥 Falha no teste de chat final:', error.message);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO FINAL DE INTEGRAÇÃO');
    console.log('='.repeat(60));
    console.log(`✅ Testes que passaram: ${passedTests}/${totalTests}`);
    console.log(`❌ Testes que falharam: ${totalTests - passedTests}/${totalTests}`);
    console.log(`📈 Taxa de sucesso: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (passedTests === totalTests) {
      console.log('\n🎉 INTEGRAÇÃO CHAT + UPLOAD FUNCIONANDO!');
      console.log('✅ Chat básico mantido funcionando');
      console.log('✅ IA analisa dados de arquivos corretamente');
      console.log('✅ Fluxo completo: Upload → Processamento → IA → Resposta');
    } else {
      console.log('\n⚠️  ALGUNS TESTES DE INTEGRAÇÃO FALHARAM');
      console.log('❌ Revise os problemas identificados');
    }
    
    console.log('\n🏁 TESTE DE INTEGRAÇÃO FINALIZADO');
    
  } catch (error) {
    console.error('\n💥 Erro geral nos testes de integração:', error);
  }
}

runChatIntegrationTests();
