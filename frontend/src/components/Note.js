const React = require('react');

class Note extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
    }

    return (
      <div className="note-title">
        <a role="button" title="Delete post"
            style={{ paddingRight: '8px' }}
            onClick={ deleteThisNote }
        >
          <span className="fa fa-remove"/>
        </a>
        {this.props.note.title}: {this.props.note.content}
      </div>
    );
  }
}

// Export the Notebook component
module.exports = Note;