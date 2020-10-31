const React = require('react');
// const PostEdit = require('./PostEdit');
// const NoteEdit = require('./NoteEdit');
const MarkdownEditor = require('./MarkdownEditor');
const NoteEdit = require('./NoteEdit');

/**
 * A button which expands into a form for writing a new post.
 */
class NoteNew extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

    // TODO Section 7: Write code to switch to edit mode when editing is clicked
    if(this.state.editing) {
      // Render component for editing the post
      return (
        <NoteEdit
          notebookId={this.props.notebookId}
          note={this.props.note}
          onSave={createNote}
          onCancel={closeEdit}
        />
        // <MarkdownEditor
        // />
      );
    }

    return (
      <button 
        className="new-note" 
        disabled={this.props.notebookId === -1} 
        onClick={ openEdit }
      >
        New Note
      </button>
    );
  }
}

module.exports = NoteNew;
