import axios from 'axios';
import constants from '../constants';

const requestAddItem = payload => {
  return {
    type: constants.ADD_SELLING_ITEM,
    payload: payload
  };
};

const addItemAction = payload => {
  return async dispatch => {
    dispatch(requestAddItem(payload));
  };
};

const closeSellAction = dataObj => {
  return async dispatch => {
    await axios.post(
      'http://u717264513.hostingerapp.com/insertSells.php',
      dataObj
    );
    dispatch({ type: constants.CLOSE_SELL });
  };
};

const removeItemAction = itemIndex => {
  return async dispatch => {
    dispatch({ type: constants.REMOVE_ITEM, payload: itemIndex });
  };
};

const requestItemByIdAction = itemId => {
  return async dispatch => {
    const { status, data } = await axios.get(
      `http://u717264513.hostingerapp.com/getProductById.php?id=${itemId}`
    );

    if (status === 200) return data;
  };
};

export {
  addItemAction,
  closeSellAction,
  removeItemAction,
  requestItemByIdAction
};
