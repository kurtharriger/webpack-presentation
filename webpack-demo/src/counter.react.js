var React = require('react/addons');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      count: 0
    };
  },
  render: function() {
    return <div><span>{this.state.count}</span></div>;
  },
  componentDidMount: function() {
    setInterval(function(){
      this.setState({count: this.state.count + 1});
    }.bind(this), 1000);
  }

});