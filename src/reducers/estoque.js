import constants from '../constants';
import { cloneDeep } from 'lodash';

const defaultState = {
  items: [],
  isLoading: false,
  error: false
};

export default (state = cloneDeep(defaultState), action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.FULL_FILL_STOCK:
      return {
        ...state,
        items: [...state.items, ...payload],
        isLoading: false,
        error: false
      };
    case constants.REQUEUST_STOCK:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case constants.SET_ERROR_STOCK:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
