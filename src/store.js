import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { logger } from 'redux-logger';

const middlewareList = [thunk, logger];

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middlewareList)
);

export default store;
