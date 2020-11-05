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
        <div className="notebook-group">
          <input className="form-control" value={this.state.title}
            placeholder="Notebook title..." onChange={onTitleChange}
          />
          <button type="button" class="btn btn-success" onClick={submitAndStopEditing}>
            <i className="fa fa-check"/>
          </button>
          <button type="button" class="btn btn-default" onClick={revertAndStopEditing}>Cancel</button>
        </div>
      </div>
    );
  }
}

module.exports = NotebookEdit;
