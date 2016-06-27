// Wallaby.js configuration
var helpers = require('./helpers');

var webpack = require('webpack');

var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {
  return {
    // The files array determines which files are included in the browser and which files are watched and served by Karma.
    files: [
      // set `load: false` to all source files and tests processed by webpack (except external files),
      // as they should not be loaded in browser, their wrapped versions will be loaded instead
      {pattern: 'config/wallaby.entry.js', instrument: false, load: false},
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'src/**/*.html', load: false},
      {pattern: 'src/**/*.css', load: false},
      {pattern: 'src/**/*.scss', load: false},
      {pattern: 'test/**/*.spec.ts', load: false, ignore: true}
    ],

    tests: [
      {pattern: 'test/**/*.spec.ts', load: false}
    ],

    testFramework: "jasmine",

    postprocessor: wallabyWebpack({
      entryPatterns: [
        'config/wallaby.entry.js',
        'test/**/*.spec.js'
      ],
      module: {
        extensions: ['', '.ts', '.js'],
        loaders: [
          {test: /\.html$/, loader: 'raw'},
          {test: /\.json$/, loader: 'json-loader'},
          {test: /\.scss$/, exclude: /node_modules/, loader: 'raw-loader!sass-loader'}
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
        })
      ],
    }),
    env: {
      type: 'browser',
      // use Electron to run your tests in the latest Chromium/V8 environment
      kind: 'electron'
    },
    // debug: true,
    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    }
  };
};