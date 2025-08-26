/**
 * TESTE COMPLETO END-TO-END DA FASE 2 - UPLOAD DE ARQUIVOS
 * 
 * Este script valida o fluxo completo da funcionalidade:
 * Upload → Processamento → Storage → IA → Resposta
 * 
 * Confirma que a Fase 2 está 100% funcionando e pronta para produção
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Configuração do teste
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  timeout: 30000,
  reportPath: path.join(__dirname, 'relatorio-fase2-completo.json'),
  testDataPath: __dirname
};

// Estrutura do relatório final
const relatorio = {
  timestamp: new Date().toISOString(),
  fase: 'Fase 2 - Upload de Arquivos',
  resultadoGeral: '',
  sucessoPercentual: 0,
  statusProdução: '',
  fluxosTestados: [
    {
      id: 'csv-end-to-end',
      nome: 'Fluxo completo CSV',
      status: 'pendente',
      etapas: {
        upload: 'pendente',
        processamento: 'pendente', 
        storage: 'pendente',
        analiseIA: 'pendente'
      },
      tempos: {},
      dadosProcessados: null,
      respostaIA: null,
      erro: null
    },
    {
      id: 'excel-end-to-end',
      nome: 'Fluxo completo Excel',
      status: 'pendente',
      etapas: {
        upload: 'pendente',
        processamento: 'pendente',
        storage: 'pendente', 
        analiseIA: 'pendente'
      },
      tempos: {},
      dadosProcessados: null,
      respostaIA: null,
      erro: null
    },
    {
      id: 'pdf-end-to-end',
      nome: 'Fluxo completo PDF',
      status: 'pendente',
      etapas: {
        upload: 'pendente',
        processamento: 'pendente',
        storage: 'pendente',
        analiseIA: 'pendente'
      },
      tempos: {},
      dadosProcessados: null,
      respostaIA: null,
      erro: null
    },
    {
      id: 'chat-basico',
      nome: 'Chat básico funcionando',
      status: 'pendente',
      etapas: {
        envioMensagem: 'pendente',
        respostaIA: 'pendente'
      },
      tempos: {},
      respostaIA: null,
      erro: null
    }
  ],
  validacoesSistema: [
    {
      id: 'storage-persistence',
      nome: 'Persistência do storage',
      status: 'pendente',
      detalhes: ''
    },
    {
      id: 'performance-upload',
      nome: 'Performance de upload',
      status: 'pendente', 
      detalhes: ''
    },
    {
      id: 'integridade-funcional',
      nome: 'Integridade funcional',
      status: 'pendente',
      detalhes: ''
    }
  ],
  problemas: [],
  recomendacoes: [],
  metricas: {
    tempoMedioUpload: 0,
    tempoMedioIA: 0,
    taxaSucessoTotal: 0
  },
  logDetalhado: []
};

// Função para fazer requisição HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      method: 'GET',
      timeout: TEST_CONFIG.timeout,
      headers: {
        'User-Agent': 'Fase2-Complete-Test/1.0'
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

// Função para upload de arquivo usando multipart manual
async function uploadFile(filePath, fileName) {
  try {
    // Ler arquivo
    const fileData = await fs.readFile(filePath);
    
    // Criar boundary para multipart
    const boundary = '----formdata-test-' + Math.random().toString(16);
    
    // Determinar Content-Type baseado na extensão
    let contentType = 'application/octet-stream';
    if (fileName.endsWith('.csv')) {
      contentType = 'text/csv';
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (fileName.endsWith('.pdf')) {
      contentType = 'application/pdf';
    }
    
    // Criar body multipart manualmente
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${contentType}\r\n\r\n`;
    const footer = `\r\n--${boundary}--\r\n`;
    
    const body = Buffer.concat([
      Buffer.from(header),
      fileData,
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
              headers: res.headers,
              body: res.statusCode === 200 ? JSON.parse(data) : data
            });
          } catch (error) {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: data
            });
          }
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Upload timeout'));
      });

      req.write(body);
      req.end();
    });
    
  } catch (error) {
    throw new Error(`Erro ao preparar upload: ${error.message}`);
  }
}

// Função para enviar mensagem para o chat
async function enviarMensagemChat(mensagem) {
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mensagem })
    });

    if (response.statusCode === 200) {
      return JSON.parse(response.body);
    } else {
      throw new Error(`Chat API retornou ${response.statusCode}: ${response.body}`);
    }
  } catch (error) {
    throw new Error(`Erro no chat: ${error.message}`);
  }
}

// Função para testar fluxo completo de um arquivo
async function testarFluxoCompleto(fluxo, nomeArquivo, tipoArquivo) {
  relatorio.logDetalhado.push(`🚀 Iniciando fluxo ${tipoArquivo.toUpperCase()}: ${nomeArquivo}`);
  
  const tempoInicial = Date.now();
  
  try {
    // ETAPA 1: Upload
    relatorio.logDetalhado.push(`📤 Executando upload de ${nomeArquivo}...`);
    const tempoUpload = Date.now();
    
    const filePath = path.join(TEST_CONFIG.testDataPath, nomeArquivo);
    const uploadResult = await uploadFile(filePath, nomeArquivo);
    
    fluxo.tempos.upload = Date.now() - tempoUpload;
    
    if (uploadResult.statusCode !== 200) {
      throw new Error(`Upload falhou: ${uploadResult.statusCode} - ${uploadResult.body}`);
    }
    
    fluxo.etapas.upload = 'sucesso';
    fluxo.dadosProcessados = uploadResult.body.file.processedData;
    relatorio.logDetalhado.push(`✅ Upload concluído em ${fluxo.tempos.upload}ms`);
    
    // ETAPA 2: Verificar processamento
    if (fluxo.dadosProcessados) {
      fluxo.etapas.processamento = 'sucesso';
      relatorio.logDetalhado.push(`✅ Dados processados: ${JSON.stringify(fluxo.dadosProcessados).length} chars`);
    } else {
      throw new Error('Dados não foram processados');
    }
    
    // ETAPA 3: Verificar storage
    relatorio.logDetalhado.push(`💾 Verificando storage...`);
    const storageResponse = await makeRequest(`${TEST_CONFIG.baseUrl}/api/files/storage`);
    
    if (storageResponse.statusCode === 200) {
      const storageData = JSON.parse(storageResponse.body);
      const arquivoEncontrado = storageData.files.find(f => 
        f.originalName === nomeArquivo || f.filename.includes(nomeArquivo.split('.')[0])
      );
      
      if (arquivoEncontrado) {
        fluxo.etapas.storage = 'sucesso';
        relatorio.logDetalhado.push(`✅ Arquivo encontrado no storage: ${arquivoEncontrado.id}`);
      } else {
        throw new Error('Arquivo não encontrado no storage');
      }
    } else {
      throw new Error(`Storage API falhou: ${storageResponse.statusCode}`);
    }
    
    // ETAPA 4: Análise da IA
    relatorio.logDetalhado.push(`🤖 Testando análise da IA...`);
    const tempoIA = Date.now();
    
    const mensagemAnalise = `Analise os dados do arquivo "${nomeArquivo}": ${JSON.stringify(fluxo.dadosProcessados)}`;
    const respostaIA = await enviarMensagemChat(mensagemAnalise);
    
    fluxo.tempos.analiseIA = Date.now() - tempoIA;
    
    if (respostaIA && respostaIA.reply) {
      fluxo.etapas.analiseIA = 'sucesso';
      fluxo.respostaIA = respostaIA.reply;
      relatorio.logDetalhado.push(`✅ IA respondeu em ${fluxo.tempos.analiseIA}ms`);
    } else {
      throw new Error('IA não forneceu resposta válida');
    }
    
    // Sucesso total
    fluxo.status = 'sucesso';
    fluxo.tempos.total = Date.now() - tempoInicial;
    relatorio.logDetalhado.push(`🎉 Fluxo ${tipoArquivo.toUpperCase()} concluído com sucesso em ${fluxo.tempos.total}ms`);
    
  } catch (error) {
    fluxo.status = 'falha';
    fluxo.erro = error.message;
    relatorio.problemas.push(`Falha no fluxo ${tipoArquivo}: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Falha no fluxo ${tipoArquivo.toUpperCase()}: ${error.message}`);
  }
}

// Função para testar chat básico
async function testarChatBasico() {
  const fluxoChat = relatorio.fluxosTestados.find(f => f.id === 'chat-basico');
  relatorio.logDetalhado.push('💬 Testando chat básico...');
  
  try {
    const tempoInicial = Date.now();
    
    // Enviar mensagem simples
    fluxoChat.etapas.envioMensagem = 'em_andamento';
    const mensagem = 'Olá, você está funcionando?';
    
    const resposta = await enviarMensagemChat(mensagem);
    fluxoChat.tempos.resposta = Date.now() - tempoInicial;
    
    if (resposta && resposta.reply) {
      fluxoChat.etapas.envioMensagem = 'sucesso';
      fluxoChat.etapas.respostaIA = 'sucesso';
      fluxoChat.respostaIA = resposta.reply;
      fluxoChat.status = 'sucesso';
      relatorio.logDetalhado.push(`✅ Chat básico funcionando - resposta em ${fluxoChat.tempos.resposta}ms`);
    } else {
      throw new Error('Chat básico não forneceu resposta válida');
    }
    
  } catch (error) {
    fluxoChat.status = 'falha';
    fluxoChat.erro = error.message;
    relatorio.problemas.push(`Chat básico falhou: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Chat básico falhou: ${error.message}`);
  }
}

// Função para validações adicionais do sistema
async function validarSistema() {
  relatorio.logDetalhado.push('🔍 Executando validações do sistema...');
  
  // Validação 1: Persistência do storage
  try {
    const storageResponse = await makeRequest(`${TEST_CONFIG.baseUrl}/api/files/storage`);
    if (storageResponse.statusCode === 200) {
      const storageData = JSON.parse(storageResponse.body);
      const validacao = relatorio.validacoesSistema.find(v => v.id === 'storage-persistence');
      validacao.status = 'sucesso';
      validacao.detalhes = `${storageData.files.length} arquivos no storage`;
      relatorio.logDetalhado.push(`✅ Storage persistente com ${storageData.files.length} arquivos`);
    }
  } catch (error) {
    const validacao = relatorio.validacoesSistema.find(v => v.id === 'storage-persistence');
    validacao.status = 'falha';
    validacao.detalhes = error.message;
  }
  
  // Validação 2: Performance
  const temposUpload = relatorio.fluxosTestados
    .filter(f => f.tempos.upload)
    .map(f => f.tempos.upload);
  
  if (temposUpload.length > 0) {
    const tempoMedio = temposUpload.reduce((a, b) => a + b, 0) / temposUpload.length;
    relatorio.metricas.tempoMedioUpload = Math.round(tempoMedio);
    
    const validacao = relatorio.validacoesSistema.find(v => v.id === 'performance-upload');
    if (tempoMedio < 10000) { // Menos de 10 segundos
      validacao.status = 'sucesso';
      validacao.detalhes = `Tempo médio: ${Math.round(tempoMedio)}ms`;
    } else {
      validacao.status = 'atenção';
      validacao.detalhes = `Tempo médio alto: ${Math.round(tempoMedio)}ms`;
    }
  }
  
  // Validação 3: Integridade funcional
  const fluxosSucesso = relatorio.fluxosTestados.filter(f => f.status === 'sucesso').length;
  const totalFluxos = relatorio.fluxosTestados.length;
  
  const validacao = relatorio.validacoesSistema.find(v => v.id === 'integridade-funcional');
  if (fluxosSucesso === totalFluxos) {
    validacao.status = 'sucesso';
    validacao.detalhes = 'Todos os fluxos funcionando';
  } else {
    validacao.status = 'falha';
    validacao.detalhes = `${fluxosSucesso}/${totalFluxos} fluxos funcionando`;
  }
}

// Função principal de teste
async function executarTesteFase2Completo() {
  console.log('🚀 INICIANDO TESTE COMPLETO DA FASE 2...');
  console.log('=' .repeat(60));
  
  relatorio.logDetalhado.push('🚀 Iniciando teste completo da Fase 2');
  relatorio.logDetalhado.push(`📅 Timestamp: ${relatorio.timestamp}`);
  
  // Limpar dados de teste anteriores
  relatorio.logDetalhado.push('🧹 Limpando dados de teste anteriores...');
  try {
    await makeRequest(`${TEST_CONFIG.baseUrl}/api/files/storage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear' })
    });
  } catch (error) {
    relatorio.logDetalhado.push(`⚠️ Não foi possível limpar storage: ${error.message}`);
  }
  
  // Testar fluxos completos
  await testarFluxoCompleto(
    relatorio.fluxosTestados.find(f => f.id === 'csv-end-to-end'),
    'test-data-csv.csv',
    'csv'
  );
  
  await testarFluxoCompleto(
    relatorio.fluxosTestados.find(f => f.id === 'excel-end-to-end'), 
    'test-data-excel.xlsx',
    'excel'
  );
  
  await testarFluxoCompleto(
    relatorio.fluxosTestados.find(f => f.id === 'pdf-end-to-end'),
    'test-data-pdf.pdf', 
    'pdf'
  );
  
  // Testar chat básico
  await testarChatBasico();
  
  // Validações do sistema
  await validarSistema();
  
  // Calcular resultados finais
  const fluxosSucesso = relatorio.fluxosTestados.filter(f => f.status === 'sucesso').length;
  const totalFluxos = relatorio.fluxosTestados.length;
  relatorio.sucessoPercentual = Math.round((fluxosSucesso / totalFluxos) * 100);
  
  // Calcular métricas
  const temposIA = relatorio.fluxosTestados
    .filter(f => f.tempos.analiseIA)
    .map(f => f.tempos.analiseIA);
  
  if (temposIA.length > 0) {
    relatorio.metricas.tempoMedioIA = Math.round(
      temposIA.reduce((a, b) => a + b, 0) / temposIA.length
    );
  }
  
  relatorio.metricas.taxaSucessoTotal = relatorio.sucessoPercentual;
  
  // Determinar status final
  if (relatorio.sucessoPercentual === 100) {
    relatorio.resultadoGeral = '🎉 FASE 2 COMPLETAMENTE FUNCIONAL!';
    relatorio.statusProdução = 'PRONTO PARA PRODUÇÃO';
    relatorio.recomendacoes.push('Fase 2 está 100% funcionando e pronta para produção');
    relatorio.recomendacoes.push('Todos os fluxos de upload estão operacionais');
    relatorio.recomendacoes.push('Sistema pode avançar para próxima fase');
  } else if (relatorio.sucessoPercentual >= 75) {
    relatorio.resultadoGeral = '⚠️ Fase 2 funcional com alguns problemas';
    relatorio.statusProdução = 'REQUER CORREÇÕES MENORES';
    relatorio.recomendacoes.push('Corrigir problemas identificados antes da produção');
  } else {
    relatorio.resultadoGeral = '❌ Fase 2 com problemas críticos';
    relatorio.statusProdução = 'NÃO PRONTO PARA PRODUÇÃO';
    relatorio.recomendacoes.push('Problemas críticos devem ser corrigidos');
  }
  
  // Salvar relatório
  await fs.writeFile(TEST_CONFIG.reportPath, JSON.stringify(relatorio, null, 2));
  
  // Exibir resultados
  console.log('\n📊 RESULTADOS DO TESTE COMPLETO FASE 2:');
  console.log('-'.repeat(50));
  console.log(`${relatorio.resultadoGeral}`);
  console.log(`📈 Taxa de Sucesso: ${relatorio.sucessoPercentual}% (${fluxosSucesso}/${totalFluxos})`);
  console.log(`🏭 Status Produção: ${relatorio.statusProdução}`);
  
  console.log('\n🔄 FLUXOS TESTADOS:');
  relatorio.fluxosTestados.forEach(fluxo => {
    const icon = fluxo.status === 'sucesso' ? '✅' : '❌';
    console.log(`  ${icon} ${fluxo.nome}: ${fluxo.status}`);
    if (fluxo.tempos.total) {
      console.log(`      ⏱️ Tempo total: ${fluxo.tempos.total}ms`);
    }
  });
  
  console.log('\n📈 MÉTRICAS:');
  console.log(`  ⏱️ Tempo médio upload: ${relatorio.metricas.tempoMedioUpload}ms`);
  console.log(`  🤖 Tempo médio IA: ${relatorio.metricas.tempoMedioIA}ms`);
  
  if (relatorio.problemas.length > 0) {
    console.log('\n🚨 PROBLEMAS IDENTIFICADOS:');
    relatorio.problemas.forEach(p => console.log(`  🚨 ${p}`));
  }
  
  console.log('\n💡 RECOMENDAÇÕES:');
  relatorio.recomendacoes.forEach(r => console.log(`  💡 ${r}`));
  
  console.log(`\n📄 Relatório completo salvo em: ${TEST_CONFIG.reportPath}`);
  console.log('=' .repeat(60));
  
  return relatorio.sucessoPercentual === 100;
}

// Executar teste
if (require.main === module) {
  executarTesteFase2Completo()
    .then(sucesso => {
      if (sucesso) {
        console.log('\n🎯 FASE 2 VALIDADA COM SUCESSO - PRONTA PARA PRODUÇÃO!');
        process.exit(0);
      } else {
        console.log('\n⚠️ FASE 2 PRECISA DE CORREÇÕES!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 ERRO FATAL NO TESTE:', error.message);
      process.exit(1);
    });
}

module.exports = { executarTesteFase2Completo };
