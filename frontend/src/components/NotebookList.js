const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const statisticsActionCreators = require('../reducers/statistics');
const Notebook = require('./Notebook');
const NotebookNew = require('./NotebookNew');
const NoteList = require('./NoteList');
const Statistics = require('./Statistics');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
  constructor(props) {
    super(props);
    props.loadStatistics();
  }
  render() {
    const createNotebookListItem = (currentNotebook) => {
      return (
        <Notebook
          key={currentNotebook.id}
          notebook={currentNotebook}
          getNotes={this.props.getNotes}
          deleteNotebook={this.props.deleteNotebook}
          reset={this.props.reset}
        />
      )
    }

    const displayNotes = () => {
      if (this.props.notes.selectedNotebookId !== -1) {
        return (
          <NoteList />
        );
      }
    };

    // this.props.loadStatistic();
    
    return (
      <div>
        <Statistics />
        <h2>Notebooks</h2>
        <NotebookNew createNotebook={this.props.createNotebook}/>
        {this.props.notebooks.data.map(createNotebookListItem)}
        {displayNotes()}
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    notes: state.notes,
    statistics: state.statistics
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators, statisticsActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
