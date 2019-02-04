import axios from 'axios';
import constants from '../constants';

const requestStock = () => {
  return { type: constants.REQUEUST_STOCK };
};

const fullFillStock = data => {
  return {
    type: constants.FULL_FILL_STOCK,
    payload: data
  };
};

const insertItemAction = ({ description, value, quantity }) => {
  return async dispatch => {
    const { status, data } = await axios.get(
      `http://u717264513.hostingerapp.com/insertItem.php?description=${description}&value=${value}&quantity=${quantity}`
    );
    return { status, data };
  };
};

const updateItemAction = ({ id, description, value, quantity }) => {
  return async dispatch => {
    const { status, data } = await axios.get(
      `http://u717264513.hostingerapp.com/updateItem.php?description=${description}&value=${value}&quantity=${quantity}&id=${id}`
    );
    return { status, data };
  };
};

const getStockAction = () => {
  return async dispatch => {
    dispatch(requestStock());
    const { status, data } = await axios.get(
      'http://u717264513.hostingerapp.com/getProducts.php'
    );
    if (status === 200) dispatch(fullFillStock(data));
    else dispatch({ type: constants.SET_ERROR_STOCK });
  };
};

export { getStockAction, insertItemAction, updateItemAction };
