const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const statisticsActionCreators = require('../reducers/statistics');
const universalSearchActionCreators = require('../reducers/universalSearch');
const Notebook = require('./Notebook');
const Note = require('./Note');
const NotebookNew = require('./NotebookNew');
const NoteList = require('./NoteList');
const UniversalSearch = require('./UniversalSeach');
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
    props.loadStatistics();
    this.state = { 
      searching: false
    };
  }
  render() {
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

    const isSearching = (value) => {
      this.setState({
        searching: value
      })
    };

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

    const displayNotebooks = () => {
      return this.state.searching === true ? '' : this.props.notebooks.data.map(createNotebookListItem);
    }
    
    return (
      <div className="float-container">
        <Statistics />
        <div className="float-child">
          <h2>Notebooks</h2>

          <UniversalSearch
            searchedNotebooks={this.props.universalSearch.notebooks}
            searchedNotes={this.props.universalSearch.notes}
            createNotebookListItem={createNotebookListItem}
            createNoteListItem={createNoteListItem}
            search={this.props.search}
            isSearching={isSearching}
            
          />

          {displayNotebooks()}

          <NotebookNew createNotebook={this.props.createNotebook}/>
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
    statistics: state.statistics,
    universalSearch: state.universalSearch
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators, statisticsActionCreators, universalSearchActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
