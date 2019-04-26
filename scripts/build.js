const { rollup } = require('rollup');
const rollupClosurePlugin = require('./plugins/closure-plugin');
const prettier = require('prettier');

const path = require('path');

const { getVersion, readDirAsync, writeFileAsync, toSnakeCase } = require('./utils');


/**
 * Input options for rollup.
 * @param {string} themeName Name of the theme.
 * @param {string} format Name of the format.
 * @return {Object} Input options for rollup.
 */
function getInputOptions(themeName, format) {
    const input = path.resolve(__dirname, '..', 'src', `${themeName}.js`);
    const plugins = getPlugins(format);
    return {
        input,
        plugins,
    }
}


/**
 * Returns set of plugins for rollup.
 * @param {string} format Name of the format.
 * @return {Array.<Object>} Plugins.
 */
function getPlugins(format) {
    if (format == 'cjs') return [];
    return [
        rollupClosurePlugin(),
    ];
}


/**
 * Returns banner for the files that are built.
 * @param {string} themeName Name of the theme.
 * @param {string} version Version of the package/collection.
 * @param {string} fullYear Build year.
 * @param {string} fullMonth Build month.
 * @param {string} fullDate Build date.
 * @return {string} Banner.
 */
function getBanner(themeName, version, fullYear, fullMonth, fullDate) {
    const buildDate = `${fullYear}-${fullMonth}-${fullDate}`;
    return `/**
 * AnyChart is lightweight robust charting library with great API and Docs, that works with your stack and has tons of chart types and features.
 *
 * Theme: ${themeName}
 * Version: ${version} (${buildDate})
 * License: https://www.anychart.com/buy/
 * Contact: sales@anychart.com
 * Copyright: AnyChart.com ${fullYear}. All rights reserved.
 */`;
}


/**
 * Returns output options for rollup.
 * @param {string} themeName Name of the theme.
 * @param {string} format Name of the format.
 * @param {string} banner Banner for the file.
 * @return {Object} Rollup output options.
 */
function getOutputOptions(themeName, format, banner) {
    const cjs = (format == 'cjs');
    const filename = cjs ? 'index.js' : `${toSnakeCase(themeName)}.min.js`;
    const file = path.resolve(__dirname, '..', cjs ? `cjs/${themeName}` : 'dist', filename);
    
    return {
        file,
        format,
        banner,
    }
}


/**
 * TODO: docs
 */
async function prettify(code, file) {
    const prettified = prettier.format(code, { parser: 'babylon' });
    try {
        await writeFileAsync(file.replace('.min', ''), prettified, 'utf8');
    } catch (e) {
        console.log(`Prettify: Error occuired writing file: ${file}`);
        throw e;
    }
}


/**
 * TODO: docs
 */
async function buildTheme(themeName, format, version, fullYear, fullMonth, fullDate) {
    try {
        const inputOptions = getInputOptions(themeName, format);
        const banner = getBanner(themeName, version, fullYear, fullMonth, fullDate);
        const outputOptions = getOutputOptions(themeName, format, banner);
        const { file } = outputOptions;

        console.log(`- Creating: ${format.padStart(6)} (${file})`);
        
        const bundle = await rollup(inputOptions);
        const { code } = await bundle.generate(outputOptions);
        await bundle.write(outputOptions);

        if (format == 'iife') {
            const prettyFile = file.replace('.min', '');
            console.log(`- Creating: pretty (${prettyFile})`);
            await prettify(code, prettyFile);
        }
    } catch (error) {
        console.log(`Errors occuired building: ${themeName}`);
        throw error;
    }
}


/**
 * TODO: docs
 */
async function buildThemes() {
    const version = await getVersion();
    const themesToBuild = process.argv.slice(2);
    const fileNames = await readDirAsync(path.resolve(__dirname, '../src'));
    let themeNames = fileNames.map(fileName => fileName.replace('.js', ''));
    if (themesToBuild.length) {
        themeNames = themeNames.filter(themeName => {
            return themesToBuild.indexOf(themeName) != -1;
        })
    }
    
    const now = new Date();
    const startTime = now.getTime();
    const fullYear = now.getUTCFullYear();
    const fullMonth = String(now.getUTCMonth() + 1).padStart(2, '0');
    const fullDate = String(now.getUTCDate()).padStart(2, '0');
    for (const themeName of themeNames) {
        console.log(`\n# Building: ${themeName}`);
        await buildTheme(themeName, 'cjs', version, fullYear, fullMonth, fullDate);
        await buildTheme(themeName, 'iife', version, fullYear, fullMonth, fullDate);
    }
    const endTime = Date.now();
    const buildTime = ((endTime - startTime) / 1000).toFixed(1);
    console.log(`\nBuild time (${themeNames.length} themes): ${buildTime} s.`);
}

buildThemes();
