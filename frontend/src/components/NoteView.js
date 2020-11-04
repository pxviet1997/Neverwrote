const React = require('react');

const NoteMeta = (props) => {
  return (
    <div>
      <a role="button" title="Delete note"
        style={{ paddingRight: '8px' }}
        onClick={ props.deleteThisNote }
      >
        <span className="fa fa-remove"/>
      </a>
      <a role="button" title="Edit note"
        style={{ paddingRight: '8px' }}
        onClick={ props.openEdit }
      >
        <span className="fa fa-edit"/>
      </a>
    </div>
  );
}

const NoteView = (props) => {
  return (
    <div>
      <NoteMeta
        deleteThisNote={props.deleteThisNote}
        openEdit={props.openEdit}
      />
      <a role="button" onClick={props.toggleDisplayContent}>
        {props.title}
      </a>
      {props.displayContent()}
    </div>
  );
}

module.exports = NoteView;