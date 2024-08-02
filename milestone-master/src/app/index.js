// src/store/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from '../components/home/slices/signupSlice';
import loginReducer from '../components/home/slices/loginSlice';

const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer
});

export default rootReducer;
