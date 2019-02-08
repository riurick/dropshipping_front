// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// window['jasmine'].DEFAULT_TIMEOUT_INTERVAL = 10000;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
    
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-parallel'),
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    parallelOptions: {
      // executors: Math. require('os').cpus().length,
      shardStrategy: 'round-robin'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    // logLevel: config.LOG_DEBUG,
    autoWatch: true,
    // browsers: ['Chrome'],
    browsers: ['ChromeHeadless'],
    singleRun: false,
    // maximum number of tries a browser will attempt in the case of a disconnection
    browserDisconnectTolerance: 10,

    // How long will Karma wait for a message from a browser before disconnecting from it (in ms).
    browserNoActivityTimeout: 50000
  });
};