/**
 * TESTE DE VALIDAÇÃO DA INTERFACE DE UPLOAD
 * 
 * Este script valida todos os elementos visuais da interface de upload
 * sem modificar funcionalidades existentes
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Configuração do teste
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  timeout: 5000,
  reportPath: path.join(__dirname, 'relatorio-interface-validacao.json')
};

// Estrutura do relatório
const relatorio = {
  timestamp: new Date().toISOString(),
  resultadoGeral: '',
  sucessoPercentual: 0,
  criteriosValidacao: [
    {
      id: 'chat-page-access',
      nome: 'Acesso à página /chat',
      status: 'pendente',
      detalhes: '',
      esperado: 'Página /chat deve carregar sem erros',
      resultado: ''
    },
    {
      id: 'upload-area-present',
      nome: 'Área de upload presente',
      status: 'pendente',
      detalhes: '',
      esperado: 'Deve existir área com drag & drop para upload',
      resultado: ''
    },
    {
      id: 'file-input-hidden',
      nome: 'Input de arquivo oculto',
      status: 'pendente',
      detalhes: '',
      esperado: 'Input file deve estar oculto mas funcional',
      resultado: ''
    },
    {
      id: 'select-button-present',
      nome: 'Botão de seleção presente',
      status: 'pendente',
      detalhes: '',
      esperado: 'Botão "clique para selecionar" deve estar visível',
      resultado: ''
    },
    {
      id: 'file-types-supported',
      nome: 'Tipos de arquivo suportados',
      status: 'pendente',
      detalhes: '',
      esperado: 'Deve aceitar .csv,.xlsx,.xls,.pdf',
      resultado: ''
    },
    {
      id: 'drag-drop-area',
      nome: 'Área de drag & drop estilizada',
      status: 'pendente',
      detalhes: '',
      esperado: 'Área com borda tracejada e texto explicativo',
      resultado: ''
    },
    {
      id: 'action-buttons',
      nome: 'Botões de ação (Analisar/Cancelar)',
      status: 'pendente',
      detalhes: '',
      esperado: 'Botões devem aparecer após seleção de arquivo',
      resultado: ''
    },
    {
      id: 'progress-indicator',
      nome: 'Indicador de progresso',
      status: 'pendente',
      detalhes: '',
      esperado: 'Área para mostrar status do upload',
      resultado: ''
    },
    {
      id: 'chat-integration',
      nome: 'Integração visual com chat',
      status: 'pendente',
      detalhes: '',
      esperado: 'Upload deve estar integrado à interface de chat',
      resultado: ''
    },
    {
      id: 'tailwind-styles',
      nome: 'Estilos CSS/Tailwind aplicados',
      status: 'pendente',
      detalhes: '',
      esperado: 'Interface deve ter estilos aplicados corretamente',
      resultado: ''
    }
  ],
  problemas: [],
  recomendacoes: [],
  statusDependencias: [],
  logDetalhado: []
};

// Função para fazer requisição HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      method: 'GET',
      timeout: TEST_CONFIG.timeout,
      headers: {
        'User-Agent': 'Interface-Validation-Test/1.0'
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

// Função para validar acesso à página
async function validarAcessoPagina() {
  const criterio = relatorio.criteriosValidacao.find(c => c.id === 'chat-page-access');
  
  try {
    relatorio.logDetalhado.push('🌐 Testando acesso à página /chat...');
    
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/chat`);
    
    if (response.statusCode === 200) {
      criterio.status = 'sucesso';
      criterio.resultado = `Página carregou com sucesso (${response.statusCode})`;
      relatorio.logDetalhado.push('✅ Página /chat acessível');
      return true;
    } else {
      criterio.status = 'falha';
      criterio.resultado = `Erro HTTP: ${response.statusCode}`;
      relatorio.problemas.push(`Página /chat retornou ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    criterio.status = 'erro';
    criterio.resultado = `Erro de conexão: ${error.message}`;
    relatorio.problemas.push(`Não foi possível acessar /chat: ${error.message}`);
    return false;
  }
}

// Função para validar componente ChatInterface.tsx
async function validarComponenteInterface() {
  relatorio.logDetalhado.push('📝 Validando implementação do ChatInterface.tsx...');
  
  try {
    const chatInterfacePath = path.join(process.cwd(), 'app', 'components', 'ChatInterface.tsx');
    const conteudo = await fs.readFile(chatInterfacePath, 'utf8');
    
    // Validar área de upload presente
    const criterioUploadArea = relatorio.criteriosValidacao.find(c => c.id === 'upload-area-present');
    if (conteudo.includes('Área de upload') && conteudo.includes('onDragOver') && conteudo.includes('onDrop')) {
      criterioUploadArea.status = 'sucesso';
      criterioUploadArea.resultado = 'Área de upload implementada com drag & drop';
      relatorio.logDetalhado.push('✅ Área de upload presente com drag & drop');
    } else {
      criterioUploadArea.status = 'falha';
      criterioUploadArea.resultado = 'Área de upload não encontrada ou incompleta';
    }

    // Validar input de arquivo oculto
    const criterioFileInput = relatorio.criteriosValidacao.find(c => c.id === 'file-input-hidden');
    if (conteudo.includes('type="file"') && conteudo.includes('className="hidden"')) {
      criterioFileInput.status = 'sucesso';
      criterioFileInput.resultado = 'Input de arquivo está oculto corretamente';
      relatorio.logDetalhado.push('✅ Input de arquivo oculto implementado');
    } else {
      criterioFileInput.status = 'falha';
      criterioFileInput.resultado = 'Input de arquivo não está oculto ou não existe';
    }

    // Validar botão de seleção
    const criterioBotaoSelecao = relatorio.criteriosValidacao.find(c => c.id === 'select-button-present');
    if (conteudo.includes('clique para selecionar') && conteudo.includes('fileInputRef.current?.click()')) {
      criterioBotaoSelecao.status = 'sucesso';
      criterioBotaoSelecao.resultado = 'Botão de seleção implementado';
      relatorio.logDetalhado.push('✅ Botão de seleção de arquivo presente');
    } else {
      criterioBotaoSelecao.status = 'falha';
      criterioBotaoSelecao.resultado = 'Botão de seleção não encontrado';
    }

    // Validar tipos de arquivo suportados
    const criterioTiposArquivo = relatorio.criteriosValidacao.find(c => c.id === 'file-types-supported');
    if (conteudo.includes('accept=".csv,.xlsx,.xls,.pdf"')) {
      criterioTiposArquivo.status = 'sucesso';
      criterioTiposArquivo.resultado = 'Tipos de arquivo CSV, Excel e PDF suportados';
      relatorio.logDetalhado.push('✅ Tipos de arquivo suportados configurados');
    } else {
      criterioTiposArquivo.status = 'falha';
      criterioTiposArquivo.resultado = 'Tipos de arquivo não configurados corretamente';
    }

    // Validar área de drag & drop estilizada
    const criterioDragDrop = relatorio.criteriosValidacao.find(c => c.id === 'drag-drop-area');
    if (conteudo.includes('border-dashed') && conteudo.includes('Arraste um arquivo aqui')) {
      criterioDragDrop.status = 'sucesso';
      criterioDragDrop.resultado = 'Área de drag & drop bem estilizada';
      relatorio.logDetalhado.push('✅ Área de drag & drop estilizada');
    } else {
      criterioDragDrop.status = 'falha';
      criterioDragDrop.resultado = 'Área de drag & drop não estilizada adequadamente';
    }

    // Validar botões de ação
    const criterioBotoes = relatorio.criteriosValidacao.find(c => c.id === 'action-buttons');
    if (conteudo.includes('Analisar') && conteudo.includes('Cancelar') && conteudo.includes('handleFileUpload')) {
      criterioBotoes.status = 'sucesso';
      criterioBotoes.resultado = 'Botões Analisar e Cancelar implementados';
      relatorio.logDetalhado.push('✅ Botões de ação implementados');
    } else {
      criterioBotoes.status = 'falha';
      criterioBotoes.resultado = 'Botões de ação não encontrados';
    }

    // Validar indicador de progresso
    const criterioProgresso = relatorio.criteriosValidacao.find(c => c.id === 'progress-indicator');
    if (conteudo.includes('uploadProgress') && conteudo.includes('Processando...')) {
      criterioProgresso.status = 'sucesso';
      criterioProgresso.resultado = 'Indicador de progresso implementado';
      relatorio.logDetalhado.push('✅ Indicador de progresso presente');
    } else {
      criterioProgresso.status = 'falha';
      criterioProgresso.resultado = 'Indicador de progresso não encontrado';
    }

    // Validar integração com chat
    const criterioIntegracao = relatorio.criteriosValidacao.find(c => c.id === 'chat-integration');
    if (conteudo.includes('onSendMessage') && conteudo.includes('analysisMessage')) {
      criterioIntegracao.status = 'sucesso';
      criterioIntegracao.resultado = 'Upload integrado com sistema de chat';
      relatorio.logDetalhado.push('✅ Integração com chat implementada');
    } else {
      criterioIntegracao.status = 'falha';
      criterioIntegracao.resultado = 'Integração com chat não encontrada';
    }

    // Validar estilos Tailwind
    const criterioEstilos = relatorio.criteriosValidacao.find(c => c.id === 'tailwind-styles');
    const classesTailwind = ['bg-gray-50', 'border-dashed', 'text-blue-500', 'hover:', 'transition-colors'];
    const estilosEncontrados = classesTailwind.filter(classe => conteudo.includes(classe));
    
    if (estilosEncontrados.length >= 4) {
      criterioEstilos.status = 'sucesso';
      criterioEstilos.resultado = `Estilos Tailwind aplicados (${estilosEncontrados.length}/5 classes encontradas)`;
      relatorio.logDetalhado.push('✅ Estilos Tailwind aplicados adequadamente');
    } else {
      criterioEstilos.status = 'falha';
      criterioEstilos.resultado = `Poucos estilos Tailwind encontrados (${estilosEncontrados.length}/5)`;
    }

  } catch (error) {
    relatorio.problemas.push(`Erro ao validar ChatInterface.tsx: ${error.message}`);
    relatorio.logDetalhado.push(`❌ Erro na validação do componente: ${error.message}`);
  }
}

// Função para verificar dependências e servidor
async function verificarDependencias() {
  relatorio.logDetalhado.push('🔍 Verificando dependências e servidor...');
  
  try {
    // Verificar se servidor está rodando
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/api/files/storage`);
    relatorio.statusDependencias.push({
      nome: 'Servidor Next.js',
      status: response.statusCode === 200 ? 'funcionando' : 'problema',
      detalhes: `Status: ${response.statusCode}`
    });

    // Verificar arquivos essenciais
    const arquivosEssenciais = [
      'app/components/ChatInterface.tsx',
      'app/api/upload/route.ts',
      'app/api/files/storage/route.ts',
      'app/types/fileUpload.ts'
    ];

    for (const arquivo of arquivosEssenciais) {
      try {
        await fs.access(path.join(process.cwd(), arquivo));
        relatorio.statusDependencias.push({
          nome: arquivo,
          status: 'presente',
          detalhes: 'Arquivo existe'
        });
      } catch {
        relatorio.statusDependencias.push({
          nome: arquivo,
          status: 'ausente',
          detalhes: 'Arquivo não encontrado'
        });
      }
    }

  } catch (error) {
    relatorio.problemas.push(`Erro na verificação de dependências: ${error.message}`);
  }
}

// Função principal de validação
async function executarValidacao() {
  console.log('🚀 INICIANDO VALIDAÇÃO DA INTERFACE DE UPLOAD...');
  console.log('=' .repeat(60));
  
  relatorio.logDetalhado.push('🚀 Iniciando validação da interface de upload');
  relatorio.logDetalhado.push(`📅 Timestamp: ${relatorio.timestamp}`);
  
  // Executar validações
  await verificarDependencias();
  await validarAcessoPagina();
  await validarComponenteInterface();
  
  // Calcular resultados
  const criteriosSucesso = relatorio.criteriosValidacao.filter(c => c.status === 'sucesso').length;
  const totalCriterios = relatorio.criteriosValidacao.length;
  relatorio.sucessoPercentual = Math.round((criteriosSucesso / totalCriterios) * 100);
  
  if (relatorio.sucessoPercentual >= 90) {
    relatorio.resultadoGeral = '🎉 INTERFACE VALIDADA COM SUCESSO!';
  } else if (relatorio.sucessoPercentual >= 70) {
    relatorio.resultadoGeral = '⚠️ Interface funcional com alguns problemas';
  } else {
    relatorio.resultadoGeral = '❌ Interface com problemas críticos';
  }
  
  // Gerar recomendações
  if (relatorio.problemas.length > 0) {
    relatorio.recomendacoes.push('Corrigir problemas identificados antes de prosseguir');
  }
  
  const criteriosFalha = relatorio.criteriosValidacao.filter(c => c.status === 'falha');
  if (criteriosFalha.length > 0) {
    relatorio.recomendacoes.push(`Verificar ${criteriosFalha.length} critério(s) que falharam`);
  }
  
  if (relatorio.sucessoPercentual === 100) {
    relatorio.recomendacoes.push('Interface está pronta para uso em produção');
  }
  
  // Salvar relatório
  await fs.writeFile(TEST_CONFIG.reportPath, JSON.stringify(relatorio, null, 2));
  
  // Exibir resultados
  console.log('\n📊 RESULTADOS DA VALIDAÇÃO:');
  console.log('-'.repeat(40));
  console.log(`${relatorio.resultadoGeral}`);
  console.log(`📈 Taxa de Sucesso: ${relatorio.sucessoPercentual}% (${criteriosSucesso}/${totalCriterios})`);
  
  console.log('\n✅ CRITÉRIOS DE SUCESSO:');
  relatorio.criteriosValidacao
    .filter(c => c.status === 'sucesso')
    .forEach(c => console.log(`  ✅ ${c.nome}: ${c.resultado}`));
  
  if (criteriosFalha.length > 0) {
    console.log('\n❌ CRITÉRIOS COM PROBLEMAS:');
    criteriosFalha.forEach(c => console.log(`  ❌ ${c.nome}: ${c.resultado}`));
  }
  
  if (relatorio.problemas.length > 0) {
    console.log('\n🚨 PROBLEMAS IDENTIFICADOS:');
    relatorio.problemas.forEach(p => console.log(`  🚨 ${p}`));
  }
  
  if (relatorio.recomendacoes.length > 0) {
    console.log('\n💡 RECOMENDAÇÕES:');
    relatorio.recomendacoes.forEach(r => console.log(`  💡 ${r}`));
  }
  
  console.log(`\n📄 Relatório detalhado salvo em: ${TEST_CONFIG.reportPath}`);
  console.log('=' .repeat(60));
  
  return relatorio.sucessoPercentual >= 90;
}

// Executar validação
if (require.main === module) {
  executarValidacao()
    .then(sucesso => {
      if (sucesso) {
        console.log('\n🎯 VALIDAÇÃO CONCLUÍDA COM SUCESSO!');
        process.exit(0);
      } else {
        console.log('\n⚠️ VALIDAÇÃO CONCLUÍDA COM PROBLEMAS!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 ERRO FATAL NA VALIDAÇÃO:', error.message);
      process.exit(1);
    });
}

module.exports = { executarValidacao };
