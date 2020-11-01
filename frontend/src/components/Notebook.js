const React = require('react');

const NotebookEdit = require('./NotebookEdit');

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
    };

    if(this.state.editing) {
      // Render component for editing the post
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
      this.props.reset();
    }

    const notebookClicked = () => {
      this.props.getNotes(this.props.notebook.id)
    }

    return (

      <div className="notebook-title">
          <a role="button" title="Delete notebookb"
            style={{ paddingRight: '8px' }}
            onClick={ deleteThisNotebook }
          >
            <span className="fa fa-remove"/>
          </a>
          <a role="button" title="Edit notebook"
            style={{ paddingRight: '8px' }}
            onClick={ openEdit }
          >
            <span className="fa fa-edit"/>
          </a>
          <a role="button" onClick={notebookClicked}>
            {this.props.notebook.title}
          </a>
      </div>
      
    );
  }
}

// Export the Notebook component
module.exports = Notebook;