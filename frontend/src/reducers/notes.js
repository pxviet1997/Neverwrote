const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT_1 = 'note-frontend/notes/INSERT_1';
const INSERT_2 = 'note-frontend/notes/INSERT_2';
const REMOVE = 'note-frontend/notes/REMOVE';
const RESET = 'note-frontend/notes/RESET';

const initialState = {
  data: [],
  selectedNotebookId: -1
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT_1: {
      // const unsortedNotes = action.notes;
      const data = _.orderBy(action.notes, 'createdAt','desc');
      const selectedNotebookId = action.notebookId;
      return _.assign({}, state, { data, selectedNotebookId } );
    }
    case INSERT_2: {
      const unsortedNotes = _.concat(state.data, action.notes);
      const data = _.orderBy(unsortedNotes, 'createdAt','desc');
      return _.assign({}, state, { data } );
    }
    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, { data });
    }
    case RESET: {
      return initialState;
    }
    default: 
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.reset = () => {
  return { type: RESET };
};

reducer.insertNotes1 = (notes, notebookId) => {
  return { type: INSERT_1, notes, notebookId };
};

reducer.insertNotes2 = (notes) => {
  return { type: INSERT_2, notes };
};

reducer.getNotes = (notebookId) => {
  return (dispatch) => {
    api.get('/notebooks/'+ notebookId +'/notes').then((newNotes) => {
      dispatch(reducer.insertNotes1(newNotes, notebookId));
    });
  };
};

reducer.createNote = (newNote, callback) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((note) => {
      // This post is one that the store returns us! It has post id incremented to the next available id
      dispatch(reducer.insertNotes2([note]));
      callback();
    }).catch(() => {
      alert('Failed to create note.');
    });
  };
};

// Removes a post from the visible post list
reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};

// Attempts to delete a post from the server and removes it from the visible
// post list if successful
reducer.deleteNote = (noteId) => {
   // TODO Section 8: Add code to perform delete
   return (dispatch) => {
    api.delete('/notes/' + noteId).then(() => {
      dispatch(reducer.removeNote(noteId));
    }).catch(() => {
      alert('Failed to delete note.');
    });
   };
};

// Export the action creators and reducer
module.exports = reducer;
