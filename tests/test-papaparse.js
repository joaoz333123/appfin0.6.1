// TESTE PAPAPARSE@5.5.3 - Processamento CSV
// Data: 2024-12-25
// Objetivo: Validar funcionamento com Next.js

const Papa = require('papaparse');

console.log('=== TESTE PAPAPARSE 5.5.3 ===');
console.log('Versão:', Papa.version || 'Versão não disponível');

// TESTE 1: Parsing básico de CSV
console.log('\n1. TESTE: Parsing básico de CSV');
const csvData = `nome,idade,cidade
João Silva,25,São Paulo
Maria Santos,30,Rio de Janeiro
Pedro Costa,28,Belo Horizonte`;

try {
  const result = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  });
  
  console.log('✅ Dados parseados:', result.data.length, 'registros');
  console.log('✅ Headers detectados:', result.meta.fields);
  console.log('✅ Delimitador:', result.meta.delimiter);
  console.log('✅ Primeiro registro:', result.data[0]);
} catch (error) {
  console.error('❌ Erro no parsing básico:', error);
}

// TESTE 2: Transformação de dados
console.log('\n2. TESTE: Transformação de dados');
const csvWithQuotes = `"produto","preco","categoria"
"Notebook Dell","2500.50","Eletrônicos"
"Mouse Logitech","85.90","Acessórios"`;

try {
  const result2 = Papa.parse(csvWithQuotes, {
    header: true,
    dynamicTyping: true,
    transform: (value, field) => {
      if (field === 'preco' && typeof value === 'string') {
        return parseFloat(value.replace(',', '.'));
      }
      return value;
    }
  });
  
  console.log('✅ Transformação aplicada');
  console.log('✅ Preço transformado:', typeof result2.data[0].preco, result2.data[0].preco);
} catch (error) {
  console.error('❌ Erro na transformação:', error);
}

// TESTE 3: Detecção automática
console.log('\n3. TESTE: Detecção automática de formato');
const csvSemicolon = `nome;idade;salario
Ana;32;4500.00
Carlos;29;3800.00`;

try {
  const result3 = Papa.parse(csvSemicolon, {
    header: true,
    dynamicTyping: true
  });
  
  console.log('✅ Delimitador detectado:', result3.meta.delimiter);
  console.log('✅ Dados processados:', result3.data.length, 'registros');
} catch (error) {
  console.error('❌ Erro na detecção automática:', error);
}

console.log('\n=== PAPAPARSE 5.5.3 - TESTE COMPLETO ===');
