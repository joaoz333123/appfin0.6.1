const http = require('http');
const fs = require('fs');
const path = require('path');

// Configurações de teste
const HOST = 'localhost';
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}`;

// Utilidades de teste
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, body: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

function createMultipartData(fields, files = []) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  let data = '';

  // Adicionar campos
  for (const [key, value] of Object.entries(fields)) {
    data += `--${boundary}\r\n`;
    data += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
    data += `${value}\r\n`;
  }

  // Adicionar arquivos
  for (const file of files) {
    data += `--${boundary}\r\n`;
    data += `Content-Disposition: form-data; name="${file.fieldName}"; filename="${file.filename}"\r\n`;
    data += `Content-Type: ${file.contentType}\r\n\r\n`;
    data += file.content + '\r\n';
  }

  data += `--${boundary}--\r\n`;

  return {
    data: Buffer.from(data),
    contentType: `multipart/form-data; boundary=${boundary}`
  };
}

// TESTES ESPECÍFICOS

async function teste1_ChatBasico() {
  console.log('\n🚀 TESTE 1: CHAT BÁSICO COM GEMINI 2.5 FLASH');
  
  try {
    const response = await makeRequest({
      hostname: HOST,
      port: PORT,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({
      message: 'Olá! Você está usando qual modelo de IA? Me diga sobre suas capacidades.',
      history: []
    }));

    if (response.status === 200 && response.body.response) {
      console.log('✅ CHAT FUNCIONANDO!');
      console.log('📝 RESPOSTA DA IA:', response.body.response.substring(0, 200) + '...');
      return { success: true, response: response.body.response };
    } else {
      console.log('❌ FALHA NO CHAT:', response.status, response.body);
      return { success: false, error: response.body };
    }
  } catch (error) {
    console.log('❌ ERRO NO TESTE DE CHAT:', error.message);
    return { success: false, error: error.message };
  }
}

async function teste2_UploadCSV() {
  console.log('\n🚀 TESTE 2: UPLOAD E PROCESSAMENTO CSV');
  
  try {
    const csvContent = 'nome,idade,cidade\nJoao,30,São Paulo\nMaria,25,Rio de Janeiro\nPedro,35,Belo Horizonte';
    
    const multipart = createMultipartData({}, [
      {
        fieldName: 'file',
        filename: 'test-migration.csv',
        contentType: 'text/csv',
        content: csvContent
      }
    ]);

    const response = await makeRequest({
      hostname: HOST,
      port: PORT,
      path: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': multipart.contentType,
        'Content-Length': multipart.data.length
      }
    }, multipart.data);

    if (response.status === 200 && response.body.success) {
      console.log('✅ UPLOAD CSV FUNCIONANDO!');
      console.log('📁 ARQUIVO:', response.body.file.filename);
      console.log('📊 DADOS PROCESSADOS:', response.body.file.processedData ? 'SIM' : 'NÃO');
      return { success: true, file: response.body.file };
    } else {
      console.log('❌ FALHA NO UPLOAD CSV:', response.status, response.body);
      return { success: false, error: response.body };
    }
  } catch (error) {
    console.log('❌ ERRO NO TESTE DE UPLOAD CSV:', error.message);
    return { success: false, error: error.message };
  }
}

async function teste3_IntegracaoCompleta() {
  console.log('\n🚀 TESTE 3: INTEGRAÇÃO COMPLETA (UPLOAD + IA ANALYSIS)');
  
  try {
    // 1. Upload de arquivo
    const csvContent = 'produto,vendas,mes\nLaptop,150,Janeiro\nMouse,300,Janeiro\nTeclado,200,Janeiro';
    
    const multipart = createMultipartData({}, [
      {
        fieldName: 'file',
        filename: 'vendas-test.csv',
        contentType: 'text/csv',
        content: csvContent
      }
    ]);

    const uploadResponse = await makeRequest({
      hostname: HOST,
      port: PORT,
      path: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': multipart.contentType,
        'Content-Length': multipart.data.length
      }
    }, multipart.data);

    if (uploadResponse.status !== 200) {
      throw new Error('Upload falhou: ' + JSON.stringify(uploadResponse.body));
    }

    console.log('✅ UPLOAD OK - Agora testando análise IA...');

    // 2. Solicitar análise dos dados via chat
    await new Promise(resolve => setTimeout(resolve, 1000)); // Aguardar processamento

    const chatResponse = await makeRequest({
      hostname: HOST,
      port: PORT,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({
      message: 'Analise os dados de vendas que acabei de enviar. Quais insights você pode fornecer?',
      history: []
    }));

    if (chatResponse.status === 200 && chatResponse.body.response) {
      console.log('✅ INTEGRAÇÃO COMPLETA FUNCIONANDO!');
      console.log('🧠 ANÁLISE IA:', chatResponse.body.response.substring(0, 300) + '...');
      return { 
        success: true, 
        upload: uploadResponse.body.file,
        analysis: chatResponse.body.response 
      };
    } else {
      console.log('❌ FALHA NA ANÁLISE IA:', chatResponse.status, chatResponse.body);
      return { success: false, error: 'Análise IA falhou' };
    }

  } catch (error) {
    console.log('❌ ERRO NA INTEGRAÇÃO COMPLETA:', error.message);
    return { success: false, error: error.message };
  }
}

async function teste4_Performance() {
  console.log('\n🚀 TESTE 4: PERFORMANCE E VELOCIDADE');
  
  const tempos = [];
  
  for (let i = 0; i < 3; i++) {
    console.log(`⏱️ Teste ${i + 1}/3...`);
    
    const inicio = Date.now();
    
    try {
      const response = await makeRequest({
        hostname: HOST,
        port: PORT,
        path: '/api/chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, JSON.stringify({
        message: 'Responda com uma frase curta sobre o clima de hoje.',
        history: []
      }));

      const fim = Date.now();
      const tempo = fim - inicio;
      tempos.push(tempo);
      
      if (response.status === 200) {
        console.log(`✅ Teste ${i + 1}: ${tempo}ms`);
      } else {
        console.log(`❌ Teste ${i + 1}: Falhou`);
      }
      
    } catch (error) {
      console.log(`❌ Teste ${i + 1}: Erro -`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  if (tempos.length > 0) {
    const tempoMedio = tempos.reduce((a, b) => a + b, 0) / tempos.length;
    console.log(`📊 TEMPO MÉDIO: ${tempoMedio.toFixed(0)}ms`);
    console.log(`📊 MELHOR TEMPO: ${Math.min(...tempos)}ms`);
    console.log(`📊 PIOR TEMPO: ${Math.max(...tempos)}ms`);
    
    return { 
      success: true, 
      tempoMedio, 
      tempos,
      performance: tempoMedio < 5000 ? 'BOA' : 'LENTA'
    };
  } else {
    return { success: false, error: 'Nenhum teste de performance completou' };
  }
}

async function teste5_VerificarRegressoes() {
  console.log('\n🚀 TESTE 5: VERIFICAÇÃO DE REGRESSÕES');
  
  const resultados = {
    chatComHistorico: false,
    storageAPI: false,
    uploadAPI: false
  };
  
  try {
    // Teste chat com histórico
    const chatHistorico = await makeRequest({
      hostname: HOST,
      port: PORT,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({
      message: 'Qual foi minha primeira pergunta?',
      history: [
        { isUser: true, content: 'Olá, meu nome é João' },
        { isUser: false, content: 'Olá João! Como posso ajudá-lo?' }
      ]
    }));
    
    resultados.chatComHistorico = chatHistorico.status === 200;
    console.log(resultados.chatComHistorico ? '✅ Chat com histórico: OK' : '❌ Chat com histórico: FALHA');

    // Teste storage API
    const storageTest = await makeRequest({
      hostname: HOST,
      port: PORT,
      path: '/api/files/storage',
      method: 'GET'
    });
    
    resultados.storageAPI = storageTest.status === 200;
    console.log(resultados.storageAPI ? '✅ Storage API: OK' : '❌ Storage API: FALHA');

    // Teste upload API (apenas endpoint)
    const uploadTest = await makeRequest({
      hostname: HOST,
      port: PORT,
      path: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({}));
    
    // 400 é esperado (bad request), 404 seria problema
    resultados.uploadAPI = uploadTest.status === 400;
    console.log(resultados.uploadAPI ? '✅ Upload API: OK' : '❌ Upload API: FALHA');

    const todasOK = Object.values(resultados).every(Boolean);
    
    return {
      success: todasOK,
      resultados,
      regressoes: todasOK ? 'NENHUMA' : 'ENCONTRADAS'
    };

  } catch (error) {
    console.log('❌ ERRO NA VERIFICAÇÃO DE REGRESSÕES:', error.message);
    return { success: false, error: error.message };
  }
}

// EXECUÇÃO PRINCIPAL
async function executarTodosOsTestes() {
  console.log('🎯 INICIANDO TESTES FUNCIONAIS COMPLETOS DA MIGRAÇÃO GEMINI 2.5 FLASH');
  console.log('📅 Data:', new Date().toLocaleString());
  console.log('🌐 Servidor:', BASE_URL);
  
  const inicioTotal = Date.now();
  
  // Aguardar servidor estar pronto
  console.log('\n⏳ Aguardando servidor estar pronto...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const resultados = {};
  
  // Executar testes sequencialmente
  resultados.teste1 = await teste1_ChatBasico();
  resultados.teste2 = await teste2_UploadCSV();
  resultados.teste3 = await teste3_IntegracaoCompleta();
  resultados.teste4 = await teste4_Performance();
  resultados.teste5 = await teste5_VerificarRegressoes();
  
  const fimTotal = Date.now();
  const tempoTotal = fimTotal - inicioTotal;
  
  // Gerar relatório
  const relatorio = {
    timestamp: new Date().toISOString(),
    tempoTotal: `${(tempoTotal / 1000).toFixed(1)}s`,
    servidor: BASE_URL,
    resultados,
    resumo: {
      totalTestes: 5,
      testesPassaram: Object.values(resultados).filter(r => r.success).length,
      testesFalharam: Object.values(resultados).filter(r => !r.success).length
    }
  };
  
  // Salvar relatório
  const nomeRelatorio = 'tests/relatorio-gemini-migration-item5.json';
  fs.writeFileSync(nomeRelatorio, JSON.stringify(relatorio, null, 2));
  
  // Exibir resumo
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO FINAL DOS TESTES');
  console.log('='.repeat(60));
  console.log(`⏱️  TEMPO TOTAL: ${relatorio.tempoTotal}`);
  console.log(`✅ TESTES PASSARAM: ${relatorio.resumo.testesPassaram}/${relatorio.resumo.totalTestes}`);
  console.log(`❌ TESTES FALHARAM: ${relatorio.resumo.testesFalharam}/${relatorio.resumo.totalTestes}`);
  
  const sucesso = relatorio.resumo.testesFalharam === 0;
  console.log('\n🎯 RESULTADO GERAL:');
  console.log(sucesso ? '✅ MIGRAÇÃO GEMINI 2.5 FLASH: SUCESSO COMPLETO!' : '❌ MIGRAÇÃO: PROBLEMAS DETECTADOS!');
  
  console.log(`\n📄 Relatório salvo em: ${nomeRelatorio}`);
  
  return relatorio;
}

// Executar se chamado diretamente
if (require.main === module) {
  executarTodosOsTestes()
    .then((relatorio) => {
      process.exit(relatorio.resumo.testesFalharam === 0 ? 0 : 1);
    })
    .catch((error) => {
      console.error('❌ ERRO FATAL:', error);
      process.exit(1);
    });
}

module.exports = { executarTodosOsTestes };
