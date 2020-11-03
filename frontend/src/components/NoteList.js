const React = require('react');

const NoteNew = require('./NoteNew');
const Note = require('./Note');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }
  render() {
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

    const onNoteFilterChange = (event) => {
      this.setState({
        inputValue: event.target.value
      });
    };

    const filterNotes = this.props.notes.data.filter(note => {
      return note.title.toLowerCase().includes(this.state.inputValue.toLowerCase())
          || note.content.toLowerCase().includes(this.state.inputValue.toLowerCase());
    });

    const displayNotes = () => {
      return this.state.inputValue === '' ? this.props.notes.data.map(createNoteListItem) : 
                                            filterNotes.map(createNoteListItem);
    }
    
    return (
      <div>
        <h2>Notes</h2>
        <div>
          <label htmlFor="search">Search for note</label>
          <input className="form-control" 
              placeholder="Search by title or content..."
              value={this.state.inputValue}
              onChange={onNoteFilterChange}
          />
        </div>
        <NoteNew 
          notebookId={this.props.notes.selectedNotebookId} 
          createNote={this.props.createNote}
        />
        
        {/* {this.props.notes.data.map(createNoteListItem)} */}
        {displayNotes()}
        
      </div>
    );
  }
}

module.exports = NoteList;
