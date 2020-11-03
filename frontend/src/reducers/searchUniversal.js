const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT = 'searchUniversal-frontend/searchUniversal/INSERT';

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
  // console.log('searchedWord : ' + searchedWord);
  return (dispatch) => {
    api.get('/searchUniversal/'+ searchedWord).then((data) => {
      // console.log('data : ' + data);
      dispatch(reducer.insert(data));
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;
