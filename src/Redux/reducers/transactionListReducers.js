// Initial State
const initialState = {
  data: [],
  isLoading: false,
};
import {transactionListConstant as tc} from '../contants/transactionListConstants';

const transactionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case tc.SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    }
    case tc.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case tc.ERROR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};

// Exports
export default transactionListReducer;
