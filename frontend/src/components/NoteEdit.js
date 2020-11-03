const React = require('react');
const _ = require('lodash');

const MarkdownEditor = require('./MarkdownEditor');

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note || {};

    this.state = {
      title: note.title || '',
      content: note.content || '',
      notebookId: props.notebookId || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      // Creates a new post object and saves it.
      console.log('this.props.note : ' + this.props.note);
      const editedNote = _.assign({}, this.props.note, {
        title: this.state.title,
        content: this.state.content,
        notebookId: this.state.notebookId
      });
      console.log('editedNote : ' + editedNote.title);
      this.props.onSave(editedNote);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    const onContentChange = (event) => {
      this.setState({ content: event.target.value });
    };

    return (
      <div>
        {/* Title field */}
        <div className="note-group">
          <input className="form-control" value={this.state.title}
            placeholder="Note title..." onChange={onTitleChange}
          />
          {/* <input className="form-control" value={this.state.content}
            placeholder="Note content..." onChange={onContentChange}
          /> */}
          
          <MarkdownEditor 
            value={ this.state.content }
            onChange={onContentChange}
          />
          <button type="button" className="btn btn-success" onClick={submitAndStopEditing}>
            <i className="fa fa-check"/>
          </button>
          <button type="button" className="btn btn-default" onClick={revertAndStopEditing}>Cancel</button>
        </div>
      </div>
    );
  }
}

module.exports = NoteEdit;
