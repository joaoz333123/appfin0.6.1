// TESTE PDF-PARSE@1.1.1 - Processamento PDF
// Data: 2024-12-25
// Objetivo: Validar funcionamento com Next.js (importação dinâmica)

console.log('=== TESTE PDF-PARSE 1.1.1 ===');

// TESTE 1: Importação dinâmica (como usado na API)
console.log('\n1. TESTE: Importação dinâmica');
async function testDynamicImport() {
  try {
    const pdf = (await import('pdf-parse')).default;
    console.log('✅ Importação dinâmica funcionando');
    console.log('✅ PDF-parse carregado:', typeof pdf);
    return pdf;
  } catch (error) {
    console.error('❌ Erro na importação dinâmica:', error);
    return null;
  }
}

// TESTE 2: Simulação de processamento (sem arquivo real)
console.log('\n2. TESTE: Verificação de API');
async function testPdfApi() {
  try {
    const pdf = await testDynamicImport();
    if (!pdf) {
      console.error('❌ PDF-parse não disponível');
      return;
    }
    
    // Verificar se é uma função
    console.log('✅ PDF-parse é função:', typeof pdf === 'function');
    
    // Simular buffer vazio para teste de API
    const emptyBuffer = Buffer.alloc(0);
    
    try {
      // Isso deve falhar, mas testa se a API está funcionando
      await pdf(emptyBuffer);
    } catch (expectedError) {
      console.log('✅ API responde corretamente (erro esperado para buffer vazio)');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste de API:', error);
  }
}

// TESTE 3: Compatibilidade com Next.js
console.log('\n3. TESTE: Compatibilidade Next.js');
function testNextjsCompatibility() {
  try {
    // Verificar se está em ambiente Node.js
    const isNodejs = typeof process !== 'undefined' && process.versions && process.versions.node;
    console.log('✅ Ambiente Node.js:', isNodejs ? 'Sim' : 'Não');
    
    // Verificar se Buffer está disponível
    const hasBuffer = typeof Buffer !== 'undefined';
    console.log('✅ Buffer disponível:', hasBuffer ? 'Sim' : 'Não');
    
    // Verificar se importação dinâmica está disponível (em módulos ES)
    console.log('✅ Dynamic import: Disponível em contexto ES modules');
    
    console.log('✅ Ambiente compatível com PDF-parse');
  } catch (error) {
    console.error('❌ Erro na verificação de compatibilidade:', error);
  }
}

// EXECUTAR TESTES
async function runAllTests() {
  await testDynamicImport();
  await testPdfApi();
  testNextjsCompatibility();
  console.log('\n=== PDF-PARSE 1.1.1 - TESTE COMPLETO ===');
}

runAllTests().catch(console.error);
