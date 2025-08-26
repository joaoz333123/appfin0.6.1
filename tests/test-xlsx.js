// TESTE XLSX@0.20.3 - Processamento Excel
// Data: 2024-12-25
// Objetivo: Validar funcionamento com Next.js

const XLSX = require('xlsx');

console.log('=== TESTE XLSX 0.20.3 ===');
console.log('Versão:', XLSX.version);

// TESTE 1: Criação de workbook
console.log('\n1. TESTE: Criação de workbook');
try {
  const workbook = XLSX.utils.book_new();
  
  // Dados de teste
  const dados = [
    ['Nome', 'Idade', 'Departamento', 'Salário'],
    ['João Silva', 25, 'TI', 4500],
    ['Maria Santos', 30, 'Vendas', 3800],
    ['Pedro Costa', 28, 'Marketing', 4200]
  ];
  
  const worksheet = XLSX.utils.aoa_to_sheet(dados);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Funcionários');
  
  console.log('✅ Workbook criado');
  console.log('✅ Planilhas:', workbook.SheetNames);
  console.log('✅ Range da planilha:', worksheet['!ref']);
} catch (error) {
  console.error('❌ Erro na criação do workbook:', error);
}

// TESTE 2: Conversão para JSON
console.log('\n2. TESTE: Conversão para JSON');
try {
  const dados2 = [
    ['Produto', 'Preço', 'Categoria'],
    ['Notebook', 2500.50, 'Eletrônicos'],
    ['Mouse', 85.90, 'Acessórios'],
    ['Teclado', 150.00, 'Acessórios']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet(dados2);
  const jsonData = XLSX.utils.sheet_to_json(ws);
  
  console.log('✅ Conversão para JSON');
  console.log('✅ Registros convertidos:', jsonData.length);
  console.log('✅ Primeiro item:', jsonData[0]);
} catch (error) {
  console.error('❌ Erro na conversão JSON:', error);
}

// TESTE 3: Múltiplas planilhas
console.log('\n3. TESTE: Múltiplas planilhas');
try {
  const wb = XLSX.utils.book_new();
  
  // Planilha 1 - Vendas
  const vendas = [
    ['Mês', 'Vendedor', 'Valor'],
    ['Janeiro', 'Ana', 15000],
    ['Janeiro', 'Carlos', 12000]
  ];
  const wsVendas = XLSX.utils.aoa_to_sheet(vendas);
  XLSX.utils.book_append_sheet(wb, wsVendas, 'Vendas');
  
  // Planilha 2 - Produtos
  const produtos = [
    ['Código', 'Nome', 'Estoque'],
    [1001, 'Produto A', 50],
    [1002, 'Produto B', 30]
  ];
  const wsProdutos = XLSX.utils.aoa_to_sheet(produtos);
  XLSX.utils.book_append_sheet(wb, wsProdutos, 'Produtos');
  
  console.log('✅ Múltiplas planilhas criadas');
  console.log('✅ Planilhas no workbook:', wb.SheetNames);
} catch (error) {
  console.error('❌ Erro nas múltiplas planilhas:', error);
}

// TESTE 4: Fórmulas Excel
console.log('\n4. TESTE: Fórmulas Excel');
try {
  const dadosFormula = [
    ['Item', 'Quantidade', 'Preço', 'Total'],
    ['Produto A', 10, 25.50],
    ['Produto B', 5, 45.00],
    ['Produto C', 15, 12.30]
  ];
  
  const wsFormula = XLSX.utils.aoa_to_sheet(dadosFormula);
  
  // Adicionar fórmulas na coluna Total (D)
  wsFormula['D2'] = { f: 'B2*C2' };
  wsFormula['D3'] = { f: 'B3*C3' };
  wsFormula['D4'] = { f: 'B4*C4' };
  wsFormula['D5'] = { f: 'SUM(D2:D4)' };
  
  // Atualizar range
  wsFormula['!ref'] = 'A1:D5';
  
  console.log('✅ Fórmulas adicionadas');
  console.log('✅ Célula D2:', wsFormula['D2']);
  console.log('✅ Range atualizado:', wsFormula['!ref']);
} catch (error) {
  console.error('❌ Erro nas fórmulas:', error);
}

console.log('\n=== XLSX 0.20.3 - TESTE COMPLETO ===');
