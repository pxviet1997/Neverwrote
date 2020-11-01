const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const statisticsActionCreators = require('../reducers/statistics');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class Statistics extends React.Component {
  render() {
    return (
      <div>
        <button className="refresh" onClick={ this.props.loadStatistics }>
         Refresh
        </button>
        <div>noteCount: {this.props.statistics.noteCount}</div>
        <div>notebookCount: {this.props.statistics.notebookCount}</div>
        <div>oldestNotebook: {this.props.statistics.oldestNotebook}</div>
        <div>recentlyUpdatedNote: {this.props.statistics.recentlyUpdatedNote}</div>
      </div>
    );
  }
}

const StatisticsContainer = ReactRedux.connect(
  state => ({
    statistics: state.statistics
  }),
  createActionDispatchers(statisticsActionCreators)
)(Statistics);

module.exports = StatisticsContainer;
