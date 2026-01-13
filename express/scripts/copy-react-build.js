import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url';

async function run() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename); 

    const src = path.join(__dirname, '../../react/build');
    const dest = path.join(__dirname, '../react/build');

    try {
        await fs.remove(dest);
        await fs.copy(src, dest);
        console.log('React build copied to Express.');
    } catch (err) {
        console.error('Copy failed:', err);
        process.exit(1);
    }
}

run();