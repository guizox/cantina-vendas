import axios from 'axios';
import constants from '../constants';

const getVendasAction = dataObj => {
  return async dispatch => {
    dispatch({ type: constants.REQUEST_REPORT_INFOS });
    const { status, data } = await axios.post(
      `http://u717264513.hostingerapp.com/getVendas.php`,
      dataObj
    );

    dispatch({ type: constants.FULL_FILL_REPORT, payload: data });
    dispatch({ type: constants.REMOVE_LOADING_REPORT });

    if (status === 200) return data;
  };
};

const requestItensPerSellAction = id => {
  return async dispatch => {
    dispatch({ type: constants.REQUEST_REPORT_INFOS });
    const { data } = await axios.get(
      `http://u717264513.hostingerapp.com/getSellById.php?id=${id}`
    );

    dispatch({ type: constants.FULL_FILL_SELL_DETAIL, payload: data });
  };
};

export { getVendasAction, requestItensPerSellAction };
