const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT = 'universalSearch-frontend/universalSearch/INSERT';
const REMOVE_NOTEBOOK = 'universalSearch-frontend/universalSearch/REMOVE_NOTEBOOK';
const REMOVE_NOTE = 'universalSearch-frontend/universalSearch/REMOVE_NOTE';
const SAVE_NOTEBOOK = 'universalSearch-frontend/universalSearch/SAVE_NOTEBOOK';
const SAVE_NOTE = 'universalSearch-frontend/universalSearch/SAVE_NOTE';


const initialState = {
  notebooks: [],
  notes: []
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT: {
      const notebooks = _.orderBy(action.data.notebooks, 'createdAt', 'DESC');
      const notes = _.orderBy(action.data.notes, 'createdAt', 'DESC');
      return _.assign({}, state, { notebooks, notes });
    }
    case REMOVE_NOTEBOOK: {
      const notebooks = _.reject(state.notebooks, {id: action.id});
      return _.assign({}, state, { notebooks });
    }
    case REMOVE_NOTE: {
      const notes = _.reject(state.notes, {id: action.id});
      return _.assign({}, state, { notes });
    }
    case SAVE_NOTEBOOK: {
      const notebooks = _.clone(state.notebooks);
      const changedIndex = _.findIndex(state.notebooks, {id: action.notebook.id })
      notebooks[changedIndex] = action.notebook;
      return _.assign({}, state, { notebooks });
    }
    case SAVE_NOTE: {
      const notes = _.clone(state.notes);
      const changedIndex = _.findIndex(state.notes, {id: action.note.id })
      notes[changedIndex] = action.note;
      return _.assign({}, state, { notes });
    }
    default: 
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insert = (data) => {
  return { type: INSERT, data };
};

reducer.search = (searchedWord) => {
  return (dispatch) => {
    api.get('/universalSearch/'+ searchedWord).then((data) => {
      dispatch(reducer.insert(data));
    });
  };
};

// Removes a post from the visible post list
reducer.deleteSearchedNotebook = (id) => {
  return { type: REMOVE_NOTEBOOK, id };
};

reducer.deleteSearchedNote = (id) => {
  return { type: REMOVE_NOTE, id };
};

reducer.saveSearchedNotebook = (notebook) => {
  return { type: SAVE_NOTEBOOK, notebook };
};
reducer.saveSearchedNote = (note) => {
  return { type: SAVE_NOTE, note };
};

// Export the action creators and reducer
module.exports = reducer;
