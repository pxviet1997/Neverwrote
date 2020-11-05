const React = require('react');

const NotebookMeta = (props) => {
  return (
    <div className="notebook-title">
      <a role="button" title="Delete notebookb"
        style={{ paddingRight: '8px' }}
        onClick={ props.deleteThisNotebook }
      >
        <span className="fa fa-remove"/>
      </a>
      <a role="button" title="Edit notebook"
        style={{ paddingRight: '8px' }}
        onClick={ props.openEdit }
      >
        <span className="fa fa-edit"/>
      </a>
    </div>
  );
}

const NotebookView = (props) => {
  return (
    <div>
      <NotebookMeta
        deleteThisNotebook={props.deleteThisNotebook}
        openEdit={props.openEdit}
      />
      
      <a role="button" onClick={props.notebookClicked}>
        {props.title}
      </a>
    </div>
  );
}

module.exports = NotebookView;