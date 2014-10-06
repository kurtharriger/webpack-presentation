//require('bootstrap/dist/css/bootstrap.min.css');
require('./main.css');

//var _ = require('lodash');
//var d3 = require('d3');
var $ = require('jquery');
var React = require('react/addons');

var mainTemplate = require('./main.html');

$('body').html(mainTemplate({title: "Webpack Demo"}));

var counter = require('./counter.react.js');
React.renderComponent(counter(), $('.content')[0]);

