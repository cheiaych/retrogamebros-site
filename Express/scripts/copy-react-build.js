const fs = require('fs-extra');
const path = require('path');

async function run() {
    const src = path.join(__dirname, '../../React/build');
    const dest = path.join(__dirname, '../React/build');

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