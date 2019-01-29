const defaultState = {
  id: '',
  items: [],
  amount: 0,
  payment: '',
  cashBack: 0
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
