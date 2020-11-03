const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const statisticsActionCreators = require('../reducers/statistics');
const searchUniversalActionCreators = require('../reducers/searchUniversal');
const Notebook = require('./Notebook');
const Note = require('./Note');
const NotebookNew = require('./NotebookNew');
const NoteList = require('./NoteList');
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
      inputValue: ''
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
          saveNotebook={this.props.saveNotebook}
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
          saveNote={this.props.saveNote}
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

    const onFilterChange = (event) => {
      this.setState({
        inputValue: event.target.value
      });
      if (event.target.value !== '') {
        this.props.search(event.target.value);
      }
      
    };


    const displayResult = () => {
      const notebooks = this.props.searchUniversal.notebooks.map(createNotebookListItem);
      const notes = this.props.searchUniversal.notes.map(createNoteListItem);
      // console.log(notebooks);
      
      return  this.state.inputValue === '' ? this.props.notebooks.data.map(createNotebookListItem) : 
                                            _.concat(notebooks, notes);
                                              // notebooks;
                                            // return this.props.notebooks.data.map(createNotebookListItem);
    }
    
    return (
      <div className="float-container">
        <Statistics />
        <div className="float-child">
          <h2>Notebooks</h2>
          <div>
            <label htmlFor="search">Search for notebooks and notes</label>
            <input className="form-control" 
                placeholder="Search by title or content..."
                value={this.state.inputValue}
                onChange={onFilterChange}
            />
            {/* {console.log(this.state.inputValue)} */}
          </div>
          <NotebookNew createNotebook={this.props.createNotebook}/>
          {displayResult()}
          {/* {this.props.notebooks.data.map(createNotebookListItem)} */}
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
    searchUniversal: state.searchUniversal
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators, statisticsActionCreators, searchUniversalActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
