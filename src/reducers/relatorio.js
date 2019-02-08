import constants from '../constants';
import { cloneDeep } from 'lodash';

const defaultState = {
  vendas: [],
  isLoading: false,
  itens: []
};

export default (state = cloneDeep(defaultState), action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.REQUEST_REPORT_INFOS:
      return {
        ...state,
        isLoading: true
      };
    case constants.REMOVE_LOADING_REPORT:
      return {
        ...state,
        isLoading: false
      };
    case constants.FULL_FILL_REPORT:
      return {
        ...state,
        vendas: payload
      };
    case constants.FULL_FILL_SELL_DETAIL:
      return {
        ...state,
        itens: payload,
        isLoading: false
      };
    default:
      return state;
  }
};
