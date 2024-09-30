import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { logToFile } from '../../components/Logger';

export async function GET(): Promise<Response> {
  const filePath = path.join(process.cwd(), 'src/app/api/data', 'environment.yaml');
  logToFile(`Reading data from file: ${filePath}`);
  console.log('File path:', filePath);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents);
  logToFile(`Data read from file: ${JSON.stringify(data)}`);

  // res.status(200).json(data);
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}