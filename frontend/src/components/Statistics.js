const React = require('react');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <button className="refresh" onClick={ props.loadStatistics }>
        Refresh
      </button>
      <table className="statistic-table">
        <tbody>
          <tr>
            <th>noteCount</th>
            <td>{props.noteCount}</td>
          </tr>
          <tr>
            <th>notebookCount</th>
            <td>{props.notebookCount}</td>
          </tr>
          <tr>
            <th>oldestNotebook</th>
            <td>{props.oldestNotebook}</td>
          </tr>
          <tr>
            <th>recentlyUpdatedNote</th>
            <td>{props.recentlyUpdatedNote}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );  
}

module.exports = Statistics;
