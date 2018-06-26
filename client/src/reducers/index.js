import { combineReducers } from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import receiptsReducer from './receiptsReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    receipts: receiptsReducer
});