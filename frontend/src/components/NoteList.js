const React = require('react');

const NoteNew = require('./NoteNew');
const Note = require('./Note');
const FrontendSearch = require('./FrontendSearch');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searching: false };
  }
  render() {
    const createNoteListItem = (currentNote) => {
      return (
        // Create a Note component
        <Note
          key={currentNote.id}
          note={currentNote}
          deleteNote={this.props.deleteNote}
          saveNote={this.props.saveNote}
          deleteSearchedNote={this.props.deleteSearchedNote}
        />
      )
    }

    const isSearching = (value) => {
      this.setState({
        searching: value
      })
    }

    // Display note list
    const displayNotes = () => {
      return this.state.searching === true ? '' : this.props.notes.data.map(createNoteListItem);
    }
    
    return (
      <div>
        <h2>Notes</h2>

        {/* Frontend search for notes within a selected notebook */}
        <FrontendSearch 
          notes={this.props.notes.data}
          createNoteListItem={createNoteListItem}
          isSearching={isSearching}
        />
        
        {/* Display the note list */}
        {displayNotes()}

        {/* Create a new note */}
        <NoteNew 
          notebookId={this.props.notes.selectedNotebookId} 
          createNote={this.props.createNote}
        />
        
      </div>
    );
  }
}

module.exports = NoteList;
