import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const dbType = process.argv[2];

if (!dbType || (dbType !== 'mysql' && dbType !== 'postgres')) {
    console.error('Please specify the database type: mysql or postgres');
    process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const prismaDir = path.join(rootDir, 'prisma');
const schemaFile = path.join(prismaDir, 'schema.prisma');
const templateFile = path.join(prismaDir, `schema.${dbType}.prisma`);
const envFile = path.join(rootDir, '.env');

// 1. Copy schema file
console.log(`Switching to ${dbType}...`);
fs.copyFileSync(templateFile, schemaFile);
console.log(`Updated prisma/schema.prisma with ${dbType} provider.`);

// 2. Update .env file
if (fs.existsSync(envFile)) {
    let envContent = fs.readFileSync(envFile, 'utf-8');

    // Regex to find DATABASE_URL
    const dbUrlRegex = /^DATABASE_URL=.*$/m;

    // Determine which var to use as source
    const sourceVarName = dbType === 'mysql' ? 'MYSQL_DATABASE_URL' : 'POSTGRES_DATABASE_URL';
    const sourceUrlMatch = envContent.match(new RegExp(`^${sourceVarName}=(.*)$`, 'm'));

    if (sourceUrlMatch) {
        const newUrl = sourceUrlMatch[1];

        if (dbUrlRegex.test(envContent)) {
            envContent = envContent.replace(dbUrlRegex, `DATABASE_URL=${newUrl}`);
        } else {
            envContent += `\nDATABASE_URL=${newUrl}`;
        }

        // Update COMPOSE_PROFILES
        const profilesRegex = /^COMPOSE_PROFILES=.*$/m;
        if (profilesRegex.test(envContent)) {
            envContent = envContent.replace(profilesRegex, `COMPOSE_PROFILES=${dbType}`);
        } else {
            envContent += `\nCOMPOSE_PROFILES=${dbType}`;
        }

        fs.writeFileSync(envFile, envContent);
        console.log(`Updated .env DATABASE_URL to use ${sourceVarName} and COMPOSE_PROFILES to ${dbType}.`);
    } else {
        console.warn(`Warning: ${sourceVarName} not found in .env. Please check your configuration.`);
    }
} else {
    console.warn('.env file not found.');
}

// 3. Generate prisma client
console.log('Generating Prisma Client...');
try {
    execSync('npx prisma generate', { stdio: 'inherit', cwd: rootDir });
    console.log('Done!');
} catch (error) {
    console.error('Failed to generate Prisma Client:', error);
    process.exit(1);
}
