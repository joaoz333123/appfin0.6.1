// SCRIPT MASTER - TESTE DE TODAS AS DEPENDÊNCIAS
// Data: 2024-12-25
// Objetivo: Executar todos os testes de dependências do AppFin

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 ===== TESTE COMPLETO DE DEPENDÊNCIAS APPFIN =====');
console.log('📅 Data:', new Date().toLocaleString());
console.log('📂 Diretório:', process.cwd());
console.log('🔧 Node.js:', process.version);

const tests = [
  {
    name: 'PAPAPARSE@5.5.3',
    file: 'test-papaparse.js',
    description: 'Processamento de arquivos CSV'
  },
  {
    name: 'XLSX@0.20.3',
    file: 'test-xlsx.js',
    description: 'Processamento de arquivos Excel'
  },
  {
    name: 'PDF-PARSE@1.1.1',
    file: 'test-pdf-parse.js',
    description: 'Processamento de arquivos PDF'
  },
  {
    name: '@google/genai@0.2.0',
    file: 'test-google-genai.js',
    description: 'Integração com IA Gemini'
  }
];

let passedTests = 0;
let failedTests = 0;

console.log('\n📋 DEPENDÊNCIAS A TESTAR:');
tests.forEach((test, index) => {
  console.log(`${index + 1}. ${test.name} - ${test.description}`);
});

console.log('\n🚀 INICIANDO TESTES...\n');

for (const test of tests) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 EXECUTANDO: ${test.name}`);
  console.log(`📄 Arquivo: ${test.file}`);
  console.log(`📝 Descrição: ${test.description}`);
  console.log(`${'='.repeat(60)}`);
  
  try {
    const testPath = path.join(__dirname, test.file);
    execSync(`node "${testPath}"`, { 
      stdio: 'inherit',
      timeout: 30000 // 30 segundos timeout
    });
    
    console.log(`\n✅ ${test.name} - TESTE PASSOU`);
    passedTests++;
  } catch (error) {
    console.error(`\n❌ ${test.name} - TESTE FALHOU`);
    console.error('Erro:', error.message);
    failedTests++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 RELATÓRIO FINAL DE TESTES');
console.log('='.repeat(60));
console.log(`✅ Testes que passaram: ${passedTests}/${tests.length}`);
console.log(`❌ Testes que falharam: ${failedTests}/${tests.length}`);
console.log(`📈 Taxa de sucesso: ${((passedTests / tests.length) * 100).toFixed(1)}%`);

if (failedTests === 0) {
  console.log('\n🎉 TODOS OS TESTES PASSARAM!');
  console.log('✅ Todas as dependências estão funcionando corretamente');
  console.log('✅ Compatibilidade com Next.js confirmada');
  console.log('✅ Pronto para próximas fases do desenvolvimento');
} else {
  console.log('\n⚠️  ALGUNS TESTES FALHARAM');
  console.log('❌ Revise as dependências que falharam');
  console.log('❌ Corrija os problemas antes de continuar');
}

console.log('\n🏁 TESTE COMPLETO FINALIZADO');
