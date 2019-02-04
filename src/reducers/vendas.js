import constants from '../constants';
import { cloneDeep } from 'lodash';

const defaultState = {
  id: '',
  items: [],
  amount: 0,
  payment: '',
  cashBack: 0
};

export default (state = cloneDeep(defaultState), action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.ADD_SELLING_ITEM:
      return {
        ...state,
        items: [...state.items, payload],
        amount: parseFloat(state.amount) + parseFloat(payload.value)
      };
    case constants.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item, index) => index !== payload),
        amount:
          state.amount -
          state.items.filter((item, index) => index === payload)[0].value
      };
    case constants.CLOSE_SELL:
      return cloneDeep(defaultState);
    default:
      return state;
  }
};
