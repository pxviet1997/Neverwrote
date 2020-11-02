const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notesActionCreators = require('../reducers/notes');
const NoteNew = require('./NoteNew');
const Note = require('./Note');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NoteList extends React.Component {
  render() {
    const createNoteListItem = (currentNote) => {
      return (
        <Note
          // notebookId={this.props.notes.selectedNotebookId} 
          key={currentNote.id}
          note={currentNote}
          deleteNote={this.props.deleteNote}
          saveNote={this.props.saveNote}
        />
      )
    }
    
    return (
      <div>
        <h2>Notes</h2>
        <NoteNew 
          notebookId={this.props.notes.selectedNotebookId} 
          createNote={this.props.createNote}
        />
        
        {this.props.notes.data.map(createNoteListItem)}
        
      </div>
    );
  }
}

const NoteListContainer = ReactRedux.connect(
  state => ({
    notes: state.notes
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;
