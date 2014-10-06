
var webpack = require('webpack');
var _ = require('lodash');

function makeWebpackConfig(profile) {
  var config = {
    cache: true,
    context: __dirname + '/src/',
    entry: ['./main.js'],
    resolve: {
      modulesDirectories: [ "node_modules", "web_modules"],
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },
    module: {
      loaders: [
        {test: /\.html$/, loader: 'mustache-loader'},
        {test: /\.react\.js$/,  loader: 'react-hot!jsx?insertPragma=React.DOM'},
        {test: /\.js$/,  loader: 'jsx'},
        {test: /\.less/, loader: 'style!css!less'},
        {test: /\.css/, loader: 'style!css'},
        {test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      ]
    }
  };
  if(profile === "dev") {
    _.merge(config, {
      debug: true,
      devtool: "eval",

      entry: [
          'webpack-dev-server/client?http://localhost:8080',
          'webpack/hot/dev-server',
          './main.js'
      ],

      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    });
  }
  return config;
}

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('dist', ['copy:dist', 'webpack:dist']);
  grunt.registerTask('dev', ['webpack-dev-server']);

  grunt.initConfig({

    copy: {
      dist: {
        cwd: 'app/',
        expand: true,
        src: '**',
        dest: 'dist/'
      }
    },
    webpack: {
      dist: makeWebpackConfig("dist")
    },

    "webpack-dev-server": {
      start: {
        keepalive: true,
        hot: true,
        port: 8080,
        contentBase: 'app/',
        webpack: makeWebpackConfig("dev")
      }
    }
  });
};