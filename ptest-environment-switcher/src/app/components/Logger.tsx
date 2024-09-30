import fs from 'fs';
import path from 'path';

export const logToFile = (message: string) => {
  // Define the log file path (e.g., store logs in a logs folder)
  const logFilePath = path.join(process.cwd(), 'logs', 'app.log');

  // Ensure that the log message has a timestamp
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  // Append the log message to the file
  try {
    // Use appendFileSync to ensure the log message is added to the end of the file
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};