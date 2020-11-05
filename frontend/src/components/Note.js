const React = require('react');

const MarkdownEditor = require('./MarkdownEditor');
const NoteEdit = require('./NoteEdit');
const NoteView = require('./NoteView');

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editing: false,
      showContent: false
     };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const saveEdit = (editedNote) => {
      this.props.saveNote(editedNote, (err) => {
        if(!err) closeEdit();
      });
      this.props.saveSearchedNote(editedNote);
    };

    if(this.state.editing) {
      return (
        <NoteEdit
          notebookId={this.props.note.notebookId}
          note={this.props.note}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }

    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
      this.props.deleteSearchedNote(this.props.note.id);
    }

    const toggleDisplayContent = () => {
      this.setState({ showContent: !this.state.showContent });
    }

    const displayContent = () => {
      return this.state.showContent == true ? '--- ' + this.props.note.content : '';
    }

    return (
      <div>
        <NoteView
          deleteThisNote={deleteThisNote}
          openEdit={openEdit}
          toggleDisplayContent={toggleDisplayContent}
          displayContent={displayContent}
          title={this.props.note.title}
        /> 
      </div>
    );
  }
}

module.exports = Note;