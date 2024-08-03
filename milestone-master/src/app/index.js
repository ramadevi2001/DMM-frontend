// src/store/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from '../components/home/slices/signupSlice';
import loginReducer from '../components/home/slices/loginSlice';
import choicesReducer from '../components/choices/choices.slice';

const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    choices: choicesReducer,
});

export default rootReducer;
