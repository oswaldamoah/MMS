const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const u = process.env.DATABASE_URL || '';
const proto = u.split(':')[0];
console.log('PROTOCOL:', proto);
console.log('PREFIX:', u.substring(0, 30) + '...');
// Mask password for safety
const masked = u.replace(/:[^:@]+@/, ':***@');
console.log('MASKED:', masked);

