const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

// Prisma's library engine requires a postgresql:// (or postgres://) protocol URL.
// The .env may contain a Prisma local dev server URL (prisma+postgres://) or
// Accelerate URL (prisma://) — neither is compatible with the direct library engine.
const NEON_DIRECT_URL = 'postgresql://neondb_owner:npg_z58wMFDRWShd@ep-spring-frost-awiuxisk-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require';

const rawUrl = process.env.DATABASE_URL || '';
const isNonPostgres = !rawUrl.startsWith('postgresql://') && !rawUrl.startsWith('postgres://');

let datasourceUrl = rawUrl;
if (isNonPostgres) {
  datasourceUrl = NEON_DIRECT_URL;
  // Override process.env so the schema-level `url = env("DATABASE_URL")` validation passes
  process.env.DATABASE_URL = NEON_DIRECT_URL;
  console.log('INFO: DATABASE_URL is not postgresql:// — overriding with direct Neon connection.');
}

if (!datasourceUrl) {
  console.error('ERROR: DATABASE_URL is not set in environment or .env file');
  process.exit(1);
}

const { PrismaClient } = require('@prisma/client');

// Prisma 5.0 uses `datasources.db.url` constructor option (top-level `datasourceUrl`
// was only added in 5.2+). Using the datasources form for broad compatibility.
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: datasourceUrl
    }
  }
});

module.exports = prisma;

