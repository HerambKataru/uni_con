import { exec } from 'child_process';
import * as fs from 'fs';

// Log that the server is starting
console.log('Starting the University Administrator Directory application...');

// Check if run.sh exists and is executable
if (!fs.existsSync('./run.sh')) {
  console.error('Error: run.sh file not found');
  process.exit(1);
}

if (!(fs.statSync('./run.sh').mode & fs.constants.S_IXUSR)) {
  console.log('Making run.sh executable...');
  fs.chmodSync('./run.sh', '755');
}

// Execute the Flask application
const flaskProcess = exec('./run.sh');

if (flaskProcess.stdout) {
  flaskProcess.stdout.on('data', (data) => {
    console.log(`Flask: ${data}`);
  });
}

if (flaskProcess.stderr) {
  flaskProcess.stderr.on('data', (data) => {
    console.error(`Flask Error: ${data}`);
  });
}

flaskProcess.on('close', (code) => {
  console.log(`Flask process exited with code ${code}`);
});

// Handle Node.js process termination
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down the Flask application...');
  flaskProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down the Flask application...');
  flaskProcess.kill('SIGTERM');
});
