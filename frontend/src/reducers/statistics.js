const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT = 'statistics-frontend/statistics/INSERT';

const initialState = {
  noteCount: 0,
  notebookCount: 0,
  oldestNotebook: '',
  recentlyUpdatedNote: ''
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT: {
      const noteCount = action.data.noteCount;
      const notebookCount = action.data.notebookCount;
      const oldestNotebook = action.data.oldestNotebook;
      const recentlyUpdatedNote = action.data.recentlyUpdatedNote
      return _.assign({}, state, { noteCount, notebookCount, oldestNotebook, recentlyUpdatedNote });
    }
    default: 
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insertStatistics = (data) => {
  return { type: INSERT, data };
};

reducer.loadStatistics = () => {
  return (dispatch) => {
    api.get('/stats').then((data) => {
      dispatch(reducer.insertStatistics(data));
    });
  }
};

// Export the action creators and reducer
module.exports = reducer;
