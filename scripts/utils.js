const { promisify } = require('util');
const childProcess = require('child_process');
const exec = promisify(childProcess.exec);

const fs = require('fs');
const mkdirAsync = promisify(fs.mkdir);
const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const getVersion = async function getVersion() {
    const { stdout } = await exec('node -p "require(\'./package.json\').version"'); 
    return stdout.trim();
}

const toSnakeCase = function toSnakeCase(value) {
    return value.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
}

module.exports = {
    getVersion,
    mkdirAsync,
    readDirAsync,
    readFileAsync,
    writeFileAsync,
    toSnakeCase,
}
