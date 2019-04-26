const ClosureCompiler = require('google-closure-compiler').compiler;
const tmp = require('tmp');

const { writeFileAsync } = require('../utils');

function compile(flags) {
  return new Promise((resolve, reject) => {
    const closureCompiler = new ClosureCompiler(flags);
    closureCompiler.run(function(exitCode, stdOut, stdErr) {
      if (!stdErr) {
        resolve(stdOut);
      } else {
        reject(new Error(stdErr));
      }
    });
  });
}

module.exports = function closure() {
  return {
    name: 'scripts/rollup-closure-plugin',
    async transform(code) {
      const inputFile = tmp.fileSync();
      const tempPath = inputFile.name;
      await writeFileAsync(tempPath, code, 'utf8');
      const compiledCode = await compile({
        compilation_level: 'ADVANCED',
        js: tempPath,
      });
      inputFile.removeCallback();
      return {code: compiledCode, map: null};
    },
  };
};
