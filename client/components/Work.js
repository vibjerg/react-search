var React = require('react'),
    Holdings = require('./HoldingStatus');

function _mapElement(element) {
  if (Array.isArray(element)) {
   element = element.join(', ');
  }
  return element;
}
var Work = React.createClass({
  render : function() {
    var element = this.props.element;
    return (
     <div className="Work">
      <h2>{element.title}</h2>
      <img src='http://lorempixel.com/200/400/' />
      <div className='element author'>{ (element.creator.length) ? 'af ' + _mapElement(element.creator[0]) : ''}</div>
      <div className='element abstract'>{ element.abstract }</div>
      <Holdings pid={element.id} />
     </div>
    );
  }
});

var WorkElement = React.createClass({
 render: function() {
  return (
   <div className="workelement">
    <span className='label'>{this.props.label}</span>
    <span className='value'>{this.props.value}</span>
   </div>
  );
 }
});

module.exports = Work;
