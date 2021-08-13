import {transactionListConstant as tc} from '../contants/transactionListConstants';
import axios from 'axios';

export const transactionListActions = () => {
  let data = {
    method: 'get',
    url: 'https://nextar.flip.id/frontend-test',
  };

  return axios(data)
    .then(res => {
      let obj = res.data;
      return Object.keys(obj).map(key => obj[key]);
    })
    .catch(error => {
      // eslint-disable-next-line no-undef
      return dispatch({
        type: tc.ERROR,
        payload: error,
      });
    });
};
