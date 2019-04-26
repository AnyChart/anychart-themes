/**
 * Generates index.es.js file that contains es6 re-exports.
 */

const { readDirAsync, writeFileAsync } = require('./utils');

const path = require('path');
const SRC_PATH = path.resolve(__dirname, '..', 'src');
const INDEX_FILE = path.resolve(__dirname, '..', 'index.es.js');


/**
 * Returns re-export string for theme.
 * @param {string} themeName The name of the theme.
 * @return {string} ES6 export string.
 */
function getExportString(themeName) {
    return `export { default as ${themeName} } from './src/${themeName}';`
}


/**
 * Main function.
 * Generates index.es.js file.
 */
async function main() {
    const files = await readDirAsync(SRC_PATH, 'utf8');
    const themeNames = files.map(fileName => fileName.replace('.js', ''));
    const exports = themeNames.map(themeName => getExportString(themeName))
    await writeFileAsync(INDEX_FILE, `${exports.join('\n')}\n`);
}

main().catch(err => {
    console.log(err);
    process.exit(1);
});
