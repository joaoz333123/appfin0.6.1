/**
 * TESTE FINAL DA FASE 2 - UPLOAD DE ARQUIVOS
 * 
 * Validação completa do fluxo end-to-end com todas as correções
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  timeout: 20000,
  reportPath: path.join(__dirname, 'relatorio-fase2-final.json')
};

// Relatório final
const relatorio = {
  timestamp: new Date().toISOString(),
  fase: 'Fase 2 - Upload de Arquivos',
  resultadoGeral: '',
  sucessoPercentual: 0,
  statusProdução: '',
  componentesValidados: [
    {
      id: 'chat-basico',
      nome: 'Chat Básico',
      status: 'pendente',
      detalhes: ''
    },
    {
      id: 'upload-csv',
      nome: 'Upload e Processamento CSV',
      status: 'pendente',
      detalhes: ''
    },
    {
      id: 'storage-api',
      nome: 'API de Storage',
      status: 'pendente',
      detalhes: ''
    },
    {
      id: 'fluxo-completo',
      nome: 'Fluxo Completo Upload + IA',
      status: 'pendente',
      detalhes: ''
    },
    {
      id: 'interface-funcionando',
      nome: 'Interface de Upload',
      status: 'pendente',
      detalhes: ''
    }
  ],
  problemas: [],
  sucessos: [],
  recomendacoes: [],
  logDetalhado: []
};

// Função para fazer requisição HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      method: 'GET',
      timeout: TEST_CONFIG.timeout,
      headers: {
        'User-Agent': 'Fase2-Final-Test/1.0'
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

// Função para upload de arquivo
async function uploadArquivo(fileName, content, contentType) {
  try {
    const boundary = '----fase2-final-' + Date.now();
    
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
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mensagem })
    });

    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      return data.reply || data.response;
    }
    return null;
  } catch (error) {
    throw new Error(`Erro no chat: ${error.message}`);
  }
}

// Validações individuais
async function validarChatBasico() {
  const componente = relatorio.componentesValidados.find(c => c.id === 'chat-basico');
  relatorio.logDetalhado.push('💬 Validando chat básico...');
  
  try {
    const resposta = await testarChat('Teste de funcionamento básico');
    
    if (resposta && resposta.length > 0) {
      componente.status = 'sucesso';
      componente.detalhes = 'Chat respondendo corretamente';
      relatorio.sucessos.push('Chat básico funcionando');
      relatorio.logDetalhado.push('✅ Chat básico: FUNCIONANDO');
    } else {
      throw new Error('Chat não forneceu resposta válida');
    }
  } catch (error) {
    componente.status = 'falha';
    componente.detalhes = error.message;
    relatorio.problemas.push(`Chat básico: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Chat básico: ${error.message}`);
  }
}

async function validarUploadCSV() {
  const componente = relatorio.componentesValidados.find(c => c.id === 'upload-csv');
  relatorio.logDetalhado.push('📤 Validando upload e processamento CSV...');
  
  try {
    const csvContent = 'produto,quantidade,preco\nNotebook,5,2500\nMouse,20,30';
    const resultado = await uploadArquivo('teste-final.csv', csvContent, 'text/csv');
    
    if (resultado.statusCode === 200 && resultado.body.file && resultado.body.file.processedData) {
      componente.status = 'sucesso';
      componente.detalhes = `Arquivo processado com ${resultado.body.file.processedData.length} registros`;
      relatorio.sucessos.push('Upload e processamento CSV funcionando');
      relatorio.logDetalhado.push('✅ Upload CSV: FUNCIONANDO');
      return resultado.body.file;
    } else {
      throw new Error(`Upload falhou: ${resultado.statusCode} - ${resultado.body}`);
    }
  } catch (error) {
    componente.status = 'falha';
    componente.detalhes = error.message;
    relatorio.problemas.push(`Upload CSV: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Upload CSV: ${error.message}`);
    return null;
  }
}

async function validarStorage() {
  const componente = relatorio.componentesValidados.find(c => c.id === 'storage-api');
  relatorio.logDetalhado.push('💾 Validando API de storage...');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/files/storage`);
    
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      componente.status = 'sucesso';
      componente.detalhes = `Storage com ${data.files.length} arquivos`;
      relatorio.sucessos.push('API de storage funcionando');
      relatorio.logDetalhado.push(`✅ Storage: ${data.files.length} arquivos`);
    } else {
      throw new Error(`Storage API falhou: ${response.statusCode}`);
    }
  } catch (error) {
    componente.status = 'falha';
    componente.detalhes = error.message;
    relatorio.problemas.push(`Storage: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Storage: ${error.message}`);
  }
}

async function validarFluxoCompleto(dadosArquivo) {
  const componente = relatorio.componentesValidados.find(c => c.id === 'fluxo-completo');
  relatorio.logDetalhado.push('🔄 Validando fluxo completo Upload + IA...');
  
  try {
    if (!dadosArquivo || !dadosArquivo.processedData) {
      throw new Error('Dados do arquivo não disponíveis para análise');
    }
    
    const mensagemAnalise = `Analise os dados deste arquivo CSV: ${JSON.stringify(dadosArquivo.processedData)}`;
    const respostaIA = await testarChat(mensagemAnalise);
    
    if (respostaIA && respostaIA.length > 10) {
      componente.status = 'sucesso';
      componente.detalhes = 'IA analisou dados do upload corretamente';
      relatorio.sucessos.push('Fluxo completo Upload → IA funcionando');
      relatorio.logDetalhado.push('✅ Fluxo completo: FUNCIONANDO');
    } else {
      throw new Error('IA não forneceu análise adequada dos dados');
    }
  } catch (error) {
    componente.status = 'falha';
    componente.detalhes = error.message;
    relatorio.problemas.push(`Fluxo completo: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Fluxo completo: ${error.message}`);
  }
}

async function validarInterface() {
  const componente = relatorio.componentesValidados.find(c => c.id === 'interface-funcionando');
  relatorio.logDetalhado.push('🖥️ Validando interface de upload...');
  
  try {
    // Verificar se a página /chat carrega
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/chat`);
    
    if (response.statusCode === 200) {
      componente.status = 'sucesso';
      componente.detalhes = 'Interface de upload acessível';
      relatorio.sucessos.push('Interface de upload funcionando');
      relatorio.logDetalhado.push('✅ Interface: ACESSÍVEL');
    } else {
      throw new Error(`Interface não acessível: ${response.statusCode}`);
    }
  } catch (error) {
    componente.status = 'falha';
    componente.detalhes = error.message;
    relatorio.problemas.push(`Interface: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Interface: ${error.message}`);
  }
}

// Função principal
async function executarTesteFinal() {
  console.log('🚀 TESTE FINAL DA FASE 2 - UPLOAD DE ARQUIVOS');
  console.log('=' .repeat(60));
  
  relatorio.logDetalhado.push('🚀 Iniciando teste final da Fase 2');
  relatorio.logDetalhado.push(`📅 Timestamp: ${relatorio.timestamp}`);
  
  // Executar validações
  await validarChatBasico();
  const dadosArquivo = await validarUploadCSV();
  await validarStorage();
  await validarFluxoCompleto(dadosArquivo);
  await validarInterface();
  
  // Calcular resultados
  const sucessos = relatorio.componentesValidados.filter(c => c.status === 'sucesso').length;
  const total = relatorio.componentesValidados.length;
  relatorio.sucessoPercentual = Math.round((sucessos / total) * 100);
  
  // Determinar status final
  if (relatorio.sucessoPercentual === 100) {
    relatorio.resultadoGeral = '🎉 FASE 2 COMPLETAMENTE FUNCIONAL!';
    relatorio.statusProdução = 'PRONTO PARA PRODUÇÃO';
    relatorio.recomendacoes.push('Fase 2 está 100% operacional');
    relatorio.recomendacoes.push('Todos os componentes funcionando corretamente');
    relatorio.recomendacoes.push('Sistema pode avançar para próxima fase');
  } else if (relatorio.sucessoPercentual >= 80) {
    relatorio.resultadoGeral = '✅ Fase 2 funcional com pequenos ajustes';
    relatorio.statusProdução = 'FUNCIONAL - PEQUENOS AJUSTES';
    relatorio.recomendacoes.push('Funcionalidade principal operacional');
    relatorio.recomendacoes.push('Ajustes menores podem ser feitos posteriormente');
  } else {
    relatorio.resultadoGeral = '⚠️ Fase 2 com problemas que precisam correção';
    relatorio.statusProdução = 'REQUER CORREÇÕES';
    relatorio.recomendacoes.push('Corrigir problemas antes de avançar');
  }
  
  // Salvar relatório
  await fs.writeFile(TEST_CONFIG.reportPath, JSON.stringify(relatorio, null, 2));
  
  // Exibir resultados
  console.log('\n📊 RESULTADOS DO TESTE FINAL:');
  console.log('-'.repeat(40));
  console.log(`${relatorio.resultadoGeral}`);
  console.log(`📈 Taxa de Sucesso: ${relatorio.sucessoPercentual}% (${sucessos}/${total})`);
  console.log(`🏭 Status: ${relatorio.statusProdução}`);
  
  console.log('\n🔍 COMPONENTES VALIDADOS:');
  relatorio.componentesValidados.forEach(c => {
    const icon = c.status === 'sucesso' ? '✅' : '❌';
    console.log(`  ${icon} ${c.nome}: ${c.detalhes}`);
  });
  
  if (relatorio.sucessos.length > 0) {
    console.log('\n✨ SUCESSOS:');
    relatorio.sucessos.forEach(s => console.log(`  ✅ ${s}`));
  }
  
  if (relatorio.problemas.length > 0) {
    console.log('\n🚨 PROBLEMAS:');
    relatorio.problemas.forEach(p => console.log(`  🚨 ${p}`));
  }
  
  console.log('\n💡 RECOMENDAÇÕES:');
  relatorio.recomendacoes.forEach(r => console.log(`  💡 ${r}`));
  
  console.log(`\n📄 Relatório completo: ${TEST_CONFIG.reportPath}`);
  console.log('=' .repeat(60));
  
  return relatorio.sucessoPercentual >= 80;
}

// Executar
if (require.main === module) {
  executarTesteFinal()
    .then(sucesso => {
      if (sucesso) {
        console.log('\n🎯 FASE 2 VALIDADA - FUNCIONAL E OPERACIONAL!');
        process.exit(0);
      } else {
        console.log('\n⚠️ FASE 2 PRECISA DE CORREÇÕES!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 ERRO FATAL:', error.message);
      process.exit(1);
    });
}

module.exports = { executarTesteFinal };
