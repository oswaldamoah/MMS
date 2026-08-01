try {
  const { PrismaClient } = require('@prisma/client');
  console.log('PrismaClient imported OK');
  const prisma = new PrismaClient();
  console.log('PrismaClient instantiated OK');
  
  prisma.$connect()
    .then(() => {
      console.log('Connected to database OK');
      return prisma.$disconnect();
    })
    .then(() => {
      console.log('Disconnected OK');
      process.exit(0);
    })
    .catch(err => {
      console.error('Connection error:', err);
      process.exit(1);
    });
} catch (e) {
  console.error('Import error:', e.message);
  console.error(e.stack);
  process.exit(1);
}

