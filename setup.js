const fs = require('fs');
const { exec } = require('child_process');

// 1. Configuración del archivo .env
const envContent = `
# Configuración del proyecto
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=clave_secreta
PORT=3001
FRONTEND_URL=http://localhost:3000
`;

const setupEnv = () => {
    try {
        fs.writeFileSync('.env', envContent, 'utf8');
        console.log('✅ Archivo .env configurado exitosamente.');
    } catch (error) {
        console.error('❌ Error al crear el archivo .env:', error.message);
    }
};

// 2. Instalar dependencias
const installDependencies = (path, name) => {
    console.log(`🔄 Instalando dependencias para ${name}...`);
    exec('npm install', { cwd: path }, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error al instalar dependencias en ${name}:`, error.message);
            return;
        }
        console.log(`✅ Dependencias instaladas para ${name}:\n${stdout}`);
    });
};

// Ejecutar el script
console.log('🚀 Configurando el entorno...');
setupEnv();

// Si deseas instalar dependencias automáticamente, habilita estas líneas:
installDependencies('./', 'Backend');
installDependencies('./frontend', 'Frontend');
