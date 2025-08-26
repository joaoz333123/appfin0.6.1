/**
 * Debug do chat para entender o problema
 */

const http = require('http');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
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
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function debugChat() {
  console.log('🔍 DEBUG DO CHAT...');
  
  try {
    const response = await makeRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Teste debug' })
    });

    console.log('Status:', response.statusCode);
    console.log('Body RAW:', JSON.stringify(response.body));
    
    if (response.statusCode === 200) {
      try {
        const data = JSON.parse(response.body);
        console.log('Parsed data:', JSON.stringify(data, null, 2));
        console.log('Has reply?', !!data.reply);
        console.log('Reply content:', data.reply);
      } catch (e) {
        console.log('Parse error:', e.message);
      }
    }
    
  } catch (error) {
    console.error('Request error:', error.message);
  }
}

debugChat();
