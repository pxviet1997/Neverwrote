const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const statisticsActionCreators = require('../reducers/statistics');
const backendUniversalSearchActionCreators = require('../reducers/backendUniversalSearch');
const Notebook = require('./Notebook');
const Note = require('./Note');
const NotebookNew = require('./NotebookNew');
const NoteList = require('./NoteList');
const BackendUniversalSearch = require('./BackendUniversalSearch');
const Statistics = require('./Statistics');

const _ = require('lodash');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
  constructor(props) {
    super(props);

    props.loadStatistics(); // Load the Summary Statistic

    this.state = { 
      searching: false
    };
  }
  render() {
    // Create the Notebook List
    const createNotebookListItem = (currentNotebook) => {
      return (
        <Notebook
          key={currentNotebook.id}
          notebook={currentNotebook}
          getNotes={this.props.getNotes}
          deleteNotebook={this.props.deleteNotebook}
          deleteSearchedNotebook={this.props.deleteSearchedNotebook}
          saveNotebook={this.props.saveNotebook}
          saveSearchedNotebook={this.props.saveSearchedNotebook}
          reset={this.props.reset}
        />
      )
    }

    // Create the Note List for searched Note
    const createNoteListItem = (currentNote) => {
      return (
        <Note
          key={currentNote.id}
          note={currentNote}
          deleteNote={this.props.deleteNote}
          deleteSearchedNote={this.props.deleteSearchedNote}
          saveNote={this.props.saveNote}
          saveSearchedNote={this.props.saveSearchedNote}
        />
      )
    }

    // Toggle  Searching state
    const isSearching = (value) => {
      this.setState({
        searching: value
      })
    };

    // Display the Note list
    const displayNotes = () => {
      if (this.props.notes.selectedNotebookId !== -1) {
        return (
          <NoteList 
            notes={this.props.notes}
            createNote={this.props.createNote}
            deleteNote={this.props.deleteNote}
            saveNote={this.props.saveNote}
            deleteSearchedNote={this.props.deleteSearchedNote}
          />
        );
      }
    };

    // Display the Notebook list
    const displayNotebooks = () => {
      return this.state.searching === true ? '' : this.props.notebooks.data.map(createNotebookListItem);
    }
    
    return (
      <div className="float-container">
        <Statistics 
          noteCount={this.props.statistics.noteCount}
          notebookCount={this.props.statistics.notebookCount}
          oldestNotebook={this.props.statistics.oldestNotebook}
          recentlyUpdatedNote={this.props.statistics.recentlyUpdatedNote}
          loadStatistics={this.props.loadStatistics}
        />
        <div className="float-child">
          <h2>Notebooks</h2>

          {/* Universal search across all notebooks and notes (in backend) */}
          <BackendUniversalSearch
            searchedNotebooks={this.props.backendUniversalSearch.notebooks}
            searchedNotes={this.props.backendUniversalSearch.notes}
            createNotebookListItem={createNotebookListItem}
            createNoteListItem={createNoteListItem}
            search={this.props.search}
            isSearching={isSearching}
          />

          {/* Display the notebook list */}
          {displayNotebooks()}

          {/* Create a new notebook */}
          <NotebookNew createNotebook={this.props.createNotebook}/>
        </div>

        <div className="float-child">
          {/* Display the note list of a particular notebook */}
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
    statistics: state.statistics,
    backendUniversalSearch: state.backendUniversalSearch
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators, statisticsActionCreators, backendUniversalSearchActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
