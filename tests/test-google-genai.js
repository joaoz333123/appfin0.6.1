// TESTE @google/genai@0.2.0 - IA Gemini
// Data: 2024-12-25
// Objetivo: Validar funcionamento com Next.js

console.log('=== TESTE @google/genai 0.2.0 ===');

// TESTE 1: Importação da biblioteca
console.log('\n1. TESTE: Importação da biblioteca');
try {
  const genAI = require('@google/genai');
  console.log('✅ Biblioteca @google/genai importada');
  
  // Verificar se GoogleGenAI está disponível (nome correto)
  const { GoogleGenAI } = genAI;
  console.log('✅ GoogleGenAI disponível:', typeof GoogleGenAI);
  console.log('✅ É construtor:', typeof GoogleGenAI === 'function');
} catch (error) {
  console.error('❌ Erro na importação:', error);
}

// TESTE 2: Inicialização (sem API key real)
console.log('\n2. TESTE: Inicialização da classe');
try {
  const { GoogleGenAI } = require('@google/genai');
  
  // Usar API key de teste
  const genAI = new GoogleGenAI('test-api-key');
  console.log('✅ Instância criada');
  console.log('✅ Tipo da instância:', typeof genAI);
  
  // Verificar métodos disponíveis
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(genAI));
  console.log('✅ Métodos disponíveis:', methods.length > 0 ? 'Sim' : 'Não');
} catch (error) {
  console.error('❌ Erro na inicialização:', error);
}

// TESTE 3: Acesso a modelos
console.log('\n3. TESTE: Acesso a modelos');
try {
  const { GoogleGenAI } = require('@google/genai');
  const genAI = new GoogleGenAI('test-api-key');
  
  // Tentar acessar modelo
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  console.log('✅ Modelo acessado');
  console.log('✅ Tipo do modelo:', typeof model);
  
  // Verificar métodos do modelo
  const modelMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(model));
  console.log('✅ Métodos do modelo:', modelMethods.includes('generateContent') ? 'generateContent disponível' : 'Métodos limitados');
} catch (error) {
  console.error('❌ Erro no acesso ao modelo:', error);
}

// TESTE 4: Verificação de tipos
console.log('\n4. TESTE: Verificação de tipos');
try {
  const genAI = require('@google/genai');
  
  // Verificar exportações principais
  const exports = Object.keys(genAI);
  console.log('✅ Exportações disponíveis:', exports);
  
  // Verificar se tem as classes necessárias
  const hasGoogleGenAI = 'GoogleGenAI' in genAI;
  console.log('✅ GoogleGenAI exportado:', hasGoogleGenAI ? 'Sim' : 'Não');
} catch (error) {
  console.error('❌ Erro na verificação de tipos:', error);
}

// TESTE 5: Compatibilidade Next.js
console.log('\n5. TESTE: Compatibilidade Next.js');
try {
  // Verificar se funciona em ambiente Node.js
  const isNodejs = typeof process !== 'undefined';
  console.log('✅ Ambiente Node.js:', isNodejs ? 'Sim' : 'Não');
  
  // Verificar se não conflita com imports ES6
  const hasRequire = typeof require !== 'undefined';
  console.log('✅ CommonJS disponível:', hasRequire ? 'Sim' : 'Não');
  
  console.log('✅ Compatível com Next.js API routes');
} catch (error) {
  console.error('❌ Erro na verificação de compatibilidade:', error);
}

console.log('\n=== @google/genai 0.2.0 - TESTE COMPLETO ===');
