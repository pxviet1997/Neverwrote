const React = require('react');
const _ = require('lodash');

class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);
    const notebook = props.notebook || {};

    this.state = {
      title: notebook.title || ''
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
      const editedNotebook = _.assign({}, this.props.notebook, {
        title: this.state.title
      });
      this.props.onSave(editedNotebook);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    return (
      <div>
        {/* Title field */}
        <div className="notebook-group">
          <input className="form-control" value={this.state.title}
            placeholder="Notebook title..." onChange={onTitleChange}
          />
          {/* <span className="input-group-button"> */}
          <button className="btn btn-success" onClick={submitAndStopEditing}>
            <i className="fa fa-check"/>
          </button>
          <button className="btn btn-default" onClick={revertAndStopEditing}>Cancel</button>
        {/* </span> */}
        </div>
      </div>
    );
  }
}

module.exports = NotebookEdit;
