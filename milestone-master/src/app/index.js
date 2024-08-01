// src/store/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../components/home/slices/authSlice';

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
