// src/store/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from '../components/home/slices/signupSlice';
import loginReducer from '../components/home/slices/loginSlice';
import choicesReducer from '../components/choices/slices/choices.slice';
import addChoiceReducer from '../components/choices/slices/addChoice.slice';
import deleteChoiceReducer from '../components/choices/slices/deleteChoice.slice';
import updateChoiceReducer  from '../components/choices/slices/updateChoice.slice';
import listGoalsReducder from '../components/goals/slices/listgoals.slice';
import addGoalsReducder from '../components/goals/slices/addGoal.slice';
import deleteGoalReducer from '../components/goals/slices/deleteGoals.slice';
const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    choices: choicesReducer,
    addChoice: addChoiceReducer,
    deleteChoice: deleteChoiceReducer,
    updateChoice: updateChoiceReducer,
    listGoals: listGoalsReducder,
    addGoal: addGoalsReducder,
    deleteGoal:  deleteGoalReducer// Add listGoal reducer here.  (If necessary)
  });
 


export default rootReducer;
