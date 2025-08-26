/**
 * Teste de debug para identificar problema no upload
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

async function testUploadDebug() {
  console.log('🔍 Testando upload com debug detalhado...');
  
  try {
    // Criar arquivo CSV simples
    const csvContent = 'nome,idade\nJoão,30\nMaria,25';
    const csvPath = path.join(__dirname, 'debug-test.csv');
    await fs.writeFile(csvPath, csvContent);
    
    // Ler arquivo
    const fileData = await fs.readFile(csvPath);
    console.log('📁 Arquivo lido:', fileData.length, 'bytes');
    
    // Criar multipart
    const boundary = '----debug-boundary-123';
    const fileName = 'debug-test.csv';
    
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: text/csv\r\n\r\n`;
    const footer = `\r\n--${boundary}--\r\n`;
    
    const body = Buffer.concat([
      Buffer.from(header),
      fileData,
      Buffer.from(footer)
    ]);
    
    console.log('📤 Body criado:', body.length, 'bytes');
    console.log('📋 Header:', header);
    
    // Fazer upload
    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/upload',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': body.length
        }
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log('📊 Response status:', res.statusCode);
          console.log('📄 Response body:', data);
          resolve({ statusCode: res.statusCode, body: data });
        });
      });

      req.on('error', reject);
      req.write(body);
      req.end();
    });
    
    console.log('✅ Resultado:', result);
    
    // Limpar arquivo de teste
    await fs.unlink(csvPath);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

testUploadDebug();
