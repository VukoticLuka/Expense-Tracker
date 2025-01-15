import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


export const envPath = path.resolve(dirname(fileURLToPath(import.meta.url)), "../../.env");