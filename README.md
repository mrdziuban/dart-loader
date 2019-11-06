# Dart Webpack loader

[![npm](https://img.shields.io/npm/v/dart-loader.svg)](https://www.npmjs.com/package/dart-loader)

### Usage

This is a simple Webpack loader that shells out to dart2js to build a [Dart web app](https://webdev.dartlang.org/).

To use it, first install the package:

```bash
$ npm install --save dart-loader
```

then configure the loader in your Webpack config:

```js
module.exports = {
  // ...
  module: {
    rules: [
      { test: /\.dart$/, loader: 'dart-loader' },
      // ...
    ]
  }
}
```

```js
// webpack-chain
module.exports = {
  chainWebpack: config => {
    config.module.rule('dart')
      .test(/\.dart$/)
      .use('dart-loader')
      .loader('dart-loader')
      .options({
        minimize: '-m'
      })
      .end()
  }
}
```

Make sure you have the `dart2js` binary somewhere in your `PATH`.

### Example

Check out the [example](example) directory for a simple Hello World example.
