const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  const callback = this.async();
  const tmp = path.join(__dirname, 'tmp');
  const fname = path.basename(this.resourcePath, '.dart');
  const cmd = `dart2js -o "${path.join(tmp, `${fname}.js`)}" "${this.resourcePath}"`;

  if (fs.existsSync(tmp)) {
    fs.rmdir(tmp, { recursive: true }, (err) => {
      if (err) throw err;
      console.log('rmdir:' + tmp)
      fs.mkdir(tmp, { recursive: true }, (err) => {
        if (err) throw err;
      });
    });
  } else {
    fs.mkdir(tmp, { recursive: true }, (err) => {
      if (err) throw err;
    });  
  }
  

  child_process.exec(cmd, function(error, stdout, stderr) {
    if (error) console.log('error:', error);
    if (stdout) console.log('stdout:', stdout);
    if (stderr) console.log('stderr:', stderr);
       
    if (error) { return callback(error, null); }
    const out = fs.readFileSync(path.join(tmp, `${fname}.js`), 'utf8');
    callback(null, out);
  });
};

