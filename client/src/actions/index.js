
import axios from 'axios';
import { FETCH_USER, FETCH_RECEIPTS, DELETE_RECEIPT } from './types';


export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitReceipt = (values, history) => async dispatch => {
  const res = await axios.post('/api/receipts', values);
  
  history.push('/receipts');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteReceipt = (id) => async dispatch => {
  const res = await axios.delete(`/api/receipts/${id}`);
  
 
  dispatch({ type: DELETE_RECEIPT, payload: res.data });
};

export const fetchReceipts = () => async dispatch => {
  const res = await axios.get('/api/receipts');

  dispatch({ type: FETCH_RECEIPTS, payload: res.data });
};
