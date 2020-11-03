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
          saveNotebook={this.props.saveNotebook}
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
      <div className="float-container">
        <Statistics />
        <div className="float-child">
          <h2>Notebooks</h2>
          {/* <div>
            <label htmlFor="search">Search for note</label>
            <input className="form-control" 
                placeholder="Search by title or content..."
                value={this.state.inputValue}
                onChange={onNoteFilterChange}
            />
          </div> */}
          <NotebookNew createNotebook={this.props.createNotebook}/>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </div>
        <div className="float-child">
          {displayNotes()}
        </div>
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
