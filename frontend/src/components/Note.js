const React = require('react');

const MarkdownEditor = require('./MarkdownEditor');
const NoteEdit = require('./NoteEdit');

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
    };

    if(this.state.editing) {
      // Render component for editing the post
      return (
        <NoteEdit
          notebookId={this.props.note.notebookId}
          note={this.props.note}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
        // <MarkdownEditor />
      );
    }

    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
    }

    const toggleDisplayContent = () => {
      this.setState({ showContent: !this.state.showContent });
    }

    const displayContent = () => {
      return this.state.showContent == true ? '--- ' + this.props.note.content : '';
    }

    return (
      <div className="note-title">
        <a role="button" title="Delete post"
            style={{ paddingRight: '8px' }}
            onClick={ deleteThisNote }
        >
          <span className="fa fa-remove"/>
        </a>
        <a role="button" title="Edit note"
            style={{ paddingRight: '8px' }}
            onClick={ openEdit }
        >
          <span className="fa fa-edit"/>
        </a>
        <a role="button" title="Show content"
            style={{ paddingRight: '8px' }}
            onClick={ toggleDisplayContent }
        >
          {this.props.note.title}
        </a>
        {displayContent()}
      </div>
    );
  }
}

// Export the Notebook component
module.exports = Note;