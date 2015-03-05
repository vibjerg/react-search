var _ = require('lodash'),
    React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    SearchStore = require('../stores/SearchStore'),
    Actions = require('../actions/Actions'),
    SearchField = require('../components/SearchField'),
    SearchResult = require('../components/SearchResult');

/**
 * Main search module
 *
 * Contains searchfield and searchresult
 * and is the main controller of data
 *
 * The components used in this component, should be dump components, only
 * reacting to the propeties comming from the state of this component
 *
 * state object contains
 * {
 *   query: Current query being send to OpenSearch,
 *   pending: is a searchresult being loaded,
 *   result: search Result object
 */
var SearchModule = React.createClass({
  mixins: [Reflux.ListenerMixin, Router.Navigation, Router.State],

  getInitialState: function() {
    let state = {
      query: this.getParams().path || null
    };
    return _.extend(SearchStore.getState(), state);
  },
  componentWillMount: function() {
   if (this.getParams().path) {
    SearchStore.search(this.getParams().path);
   }
  },
  componentDidMount: function() {
    this.listenTo(SearchStore, () => {
      this.setState(SearchStore.getState());
    });
  },
  _onSubmit : function (value) {
    this.transitionTo('search', {path: value});
  },

  _onChange : function (event) {

  },
  render: function() {
    console.log(this.state.result);
    return (
      <div className='search'>
      <SearchField initialValue={this.state.query} submit={this._onSubmit} change={this._onChange} button={true} buttonValue='Søg' />
      <SearchResult result={this.state.result} pending={this.state.pending} >
      </SearchResult>
      </div>
      );
  }
});

  module.exports = SearchModule;
