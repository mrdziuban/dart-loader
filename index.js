const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const loaderUtils = require('loader-utils');

/**
 * @summary
 * The map between the options passed to the loader
 * and the command-line `dart2js` utility flags.
 */
const optsMap = {
  'minimize': '-m',
  'typeCheck': '-c',
};

/**
 * @summary
 * Construct a command-line `dart2js` utility options string
 * from a given loader options object.
 *
 * @return {string}
 */
const constructDart2JsOptions = (options) =>
  Object.keys(options).reduce((res, key) => {
    const mapping = optsMap[key];
    return (mapping === true) ? `${res} ${mapping}` : res;
  }, '');

module.exports = function(source) {
  // Retrieve the options that were passed to the loader
  const options = loaderUtils.getOptions(this);

  // Construct the command-line options to the `dart2js` utility
  const dart2JsOptionsStr = constructDart2JsOptions(options);

  const callback = this.async();
  const tmp = path.join(__dirname, 'tmp');
  const fname = path.basename(this.resourcePath, '.dart');
  const cmd = `dart2js ${dart2JsOptionsStr} -o '${path.join(tmp, `${fname}.js`)}' '${this.resourcePath}'`;
  child_process.execSync(`rm -rf '${tmp}'`);
  child_process.execSync(`mkdir -p '${tmp}'`);

  child_process.exec(cmd, (error, stdout, stderr) => {
    // If there was an error
    if (error) {
      // Output it into the console
      const msg = stdout.red;
      console.error(msg);

      // Return from the function and call the callback
      return callback(error, null);
    }
    const out = fs.readFileSync(path.join(tmp, `${fname}.js`), 'utf8');
    callback(null, out);
  });
};
