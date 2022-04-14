import {createStore} from 'redux';

const intialState = {
  loading: false,
};

const reducer = (state = intialState, action) => {
  return state;
};

const store = createStore(reducer);

export default store;
