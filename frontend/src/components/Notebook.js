const React = require('react');

const NotebookEdit = require('./NotebookEdit');
const NotebookView = require('./NotebookView');

class Notebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const saveEdit = (editedNotebook) => {
      this.props.saveNotebook(editedNotebook, (err) => {
        if(!err) closeEdit();
      });
      this.props.saveSearchedNotebook(editedNotebook);
    };

    if(this.state.editing) {
      return (
        <NotebookEdit
          notebook={this.props.notebook}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }

    const deleteThisNotebook = () => {
      this.props.deleteNotebook(this.props.notebook.id);
      this.props.deleteSearchedNotebook(this.props.notebook.id);
      this.props.reset();
    }

    const notebookClicked = () => {
      this.props.getNotes(this.props.notebook.id)
    }

    return (
      <NotebookView 
        deleteThisNotebook={deleteThisNotebook}
        openEdit={openEdit}
        notebookClicked={notebookClicked}
        title={this.props.notebook.title}
      />
    );
  }
}

// Export the Notebook component
module.exports = Notebook;