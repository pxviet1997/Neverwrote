const React = require('react');
// const PostEdit = require('./PostEdit');
const NotebookEdit = require('./NotebookEdit');

/**
 * A button which expands into a form for writing a new post.
 */
class NotebookNew extends React.Component {
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

    const createNotebook = (newNotebook) => {
      this.props.createNotebook(newNotebook, (err) => {
        if(!err) closeEdit();
      });
    };

    // TODO Section 7: Write code to switch to edit mode when editing is clicked
    if(this.state.editing) {
      // Render component for editing the post
      return (
        <NotebookEdit
          notebook={this.props.notebook}
          onSave={createNotebook}
          onCancel={closeEdit}
        />
      );
    }

    return (
      <button className="new-notebook" onClick={ openEdit }>
        New Notebook
      </button>
    );
  }
}

module.exports = NotebookNew;
