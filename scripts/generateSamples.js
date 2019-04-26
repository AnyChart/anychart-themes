/**
 * Generate playground samples for all locales.
 */

const { mkdirAsync, readDirAsync, readFileAsync, writeFileAsync } = require('./utils');

const dot = require('dot');
dot.templateSettings.strip = false;
dot.templateSettings.append = false;

const path = require('path');
const SRC_PATH = path.resolve(__dirname, '..', 'src');
const SAMPLES_PATH = path.resolve(__dirname, '..', 'samples');

function capitalize(str) {
    return String(str.charAt(0)).toUpperCase() +
        String(str.substr(1));
};

/**
 * Main function.
 */
async function main() {
    const files = await readDirAsync(SRC_PATH, 'utf8');
    const themeNames = files.map(fileName => fileName.replace('.js', ''));

    await mkdirAsync(SAMPLES_PATH, { recursive: true });
    let templateString = await readFileAsync(path.resolve(__dirname, 'templates', 'index.html'));
    let templateProcessor = dot.template(templateString);
    console.log(`Generating samples.`);
    for (const theme of themeNames) {
        let contentName = capitalize(theme.replace(/([A-Z])/g, ' $1'));
        let htmlContent = templateProcessor({ theme, contentName });
        let htmlPath = path.resolve(SAMPLES_PATH, `${theme}.html`);
        await writeFileAsync(htmlPath, htmlContent);
    }

}

main();
