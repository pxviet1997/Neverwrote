const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT = 'notebook-frontend/notebooks/INSERT';
const REMOVE = 'notebook-frontend/notebooks/REMOVE';
const CHANGE = 'notebook-frontend/notebooks/CHANGE';

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT: {
      const unsortedNotebooks = _.concat(state.data, action.notebooks);
      const data = _.orderBy(unsortedNotebooks, 'createdAt','desc');
      return _.assign({}, state, { data } );
    }
    case CHANGE: {
      const data = _.clone(state.data);
      const changedIndex = _.findIndex(state.data, {id: action.notebook.id })
      data[changedIndex] = action.notebook;
      return _.assign({}, state, { data });
    }
    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, { data });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insertNotebooks = (notebooks) => {
  return { type: INSERT, notebooks };
};

reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      // This post is one that the store returns us! It has post id incremented to the next available id
      dispatch(reducer.insertNotebooks([notebook]));
      callback();
    }).catch(() => {
      alert('Failed to create notebook.');
    });
  };
};

// Removes a post from the visible post list
reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

// Attempts to delete a post from the server and removes it from the visible
// post list if successful
reducer.deleteNotebook = (notebookId) => {
   // TODO Section 8: Add code to perform delete
   return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then(() => {
      dispatch(reducer.removeNotebook(notebookId));
    }).catch(() => {
      alert('Failed to delete notebook.');
    });
   };
};

// Attempts to update a post on the server and updates local post data if
// successful
reducer.saveNotebook = (editedNotebook, callback) => {
  return (dispatch) => {
    api.put('/notebooks/' + editedNotebook.id, editedNotebook).then((notebook) => {
      // Saves local notebook.
      dispatch(reducer.changeNotebook(notebook));
      callback();
    }).catch(() => {
      alert('Failed to save notebook. Are all of the fields filled in correctly?');
    });
  };
};

reducer.changeNotebook = (notebook) => {
  return { type: CHANGE, notebook };
};

// Export the action creators and reducer
module.exports = reducer;
