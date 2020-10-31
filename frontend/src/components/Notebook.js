const React = require('react');

class Notebook extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deleteThisNotebook = () => {
      this.props.deleteNotebook(this.props.notebook.id);
      this.props.reset();
    }

    const notebookClicked = () => {
      this.props.getNotes(this.props.notebook.id)
    }

    return (

      <div className="notebook-title">
          <a role="button" title="Delete post"
            style={{ paddingRight: '8px' }}
            onClick={ deleteThisNotebook }
          >
            <span className="fa fa-remove"/>
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