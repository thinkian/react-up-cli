import { combineReducers } from 'redux';

// Initial reducer
const $initialReducer = (state = {}, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  $initialReducer
});

export default rootReducer;
