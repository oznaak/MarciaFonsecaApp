const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Build the client
console.log('Building the client...');
execSync('cd client && npm install && npm run build', { stdio: 'inherit' });

// Create dist directory in server if it doesn't exist
const serverDistPath = path.join(__dirname, 'server', 'dist');
if (!fs.existsSync(serverDistPath)) {
  fs.mkdirSync(serverDistPath, { recursive: true });
}

// Copy client build to server/dist
console.log('Copying client build to server...');
execSync('cp -r client/dist server/', { stdio: 'inherit' });

// Install server dependencies
console.log('Installing server dependencies...');
execSync('cd server && npm install', { stdio: 'inherit' });

console.log('Build completed successfully!');