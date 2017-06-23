const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

module.exports = function(source) {
  const callback = this.async();
  const tmp = path.join(__dirname, 'tmp');
  const fname = path.basename(this.resourcePath, '.dart');
  const cmd = `dart2js -o '${path.join(tmp, `${fname}.js`)}' '${this.resourcePath}'`;
  child_process.execSync(`rm -rf '${tmp}'`);
  child_process.execSync(`mkdir -p '${tmp}'`);

  child_process.exec(cmd, (error, stdout, stderr) => {
    // If there was an error
    if (error) {
      // Output it into the console
      const msg = stdout.red;
      throw new Error(msg);

      // Return from the function and call the callback
      return callback(error, null);
    }
    const out = fs.readFileSync(path.join(tmp, `${fname}.js`), 'utf8');
    callback(null, out);
  });
};
