module.exports = {
  entry: './src/hello_world.dart',
  output: { filename: 'bundle.js' },
  module: {
    rules: [
      { test: /\.dart$/, loader: 'dart-loader' }
    ]
  }
}
