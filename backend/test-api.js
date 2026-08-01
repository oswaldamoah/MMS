const http = require('http');

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    }).on('error', e => reject(e.message));
  });
}

async function runTests() {
  console.log('=== Testing MMS API (Prisma/Postgres) ===\n');

  // 1. Health check
  try {
    const health = await testEndpoint('/api/health');
    console.log(`[Health] ${health.status} => ${JSON.stringify(health.body)}`);
  } catch (e) {
    console.log(`[Health] FAILED: ${e}`);
  }

  // 2. Events
  try {
    const events = await testEndpoint('/api/events');
    console.log(`[Events] ${events.status} => ${events.body.length || 0} events`);
  } catch (e) {
    console.log(`[Events] FAILED: ${e}`);
  }

  // 3. Announcements
  try {
    const ancs = await testEndpoint('/api/announcements');
    console.log(`[Announcements] ${ancs.status} => ${ancs.body.length || 0} announcements`);
  } catch (e) {
    console.log(`[Announcements] FAILED: ${e}`);
  }

  // 4. Payment Info
  try {
    const pay = await testEndpoint('/api/payment-info');
    console.log(`[PaymentInfo] ${pay.status} => ${pay.body.length || 0} payment options`);
  } catch (e) {
    console.log(`[PaymentInfo] FAILED: ${e}`);
  }

  // 5. Members
  try {
    const members = await testEndpoint('/api/members');
    console.log(`[Members] ${members.status} => ${members.body.length || 0} members`);
  } catch (e) {
    console.log(`[Members] FAILED: ${e}`);
  }

  console.log('\n=== Tests Complete ===');
}

runTests();

