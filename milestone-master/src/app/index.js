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
import updateGoalReducer from '../components/goals/slices/updateGoal.slice';
import listMonthlyGoalsReducer from '../components/monthly-goals/slices/listOfMonthlyGoals.slice';
import addMonthlyGoalsReducder from '../components/monthly-goals/slices/addMonthlyGoals.slice';
import deleteMonthlyGoalsReducer from '../components/monthly-goals/slices/deleteMonthlyGoal.slice';
import updateMonthlyGoalReducer  from '../components/monthly-goals/slices/updateMonthlyGoal.slice';
import listOfHabitsReducer from '../components/habits/slices/listOfHabits.slice';
import listOfObservationsReducer from '../components/observations/slices/listObservations.slice';
import addObservationReducer from '../components/observations/slices/addObservation.slice';
import updateObservationReducer from '../components/observations/slices/updateObservation.slice';
import deleteObservationReducer from '../components/observations/slices/deleteObservation.slice';
import addHabitReducer from '../components/habits/slices/addHabit.slice';
import deleteHabitReducer from '../components/habits/slices/deleteHabit.slice';
import updateHabitReducer from '../components/habits/slices/updateHabit.slice';
const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    choices: choicesReducer,
    addChoice: addChoiceReducer,
    deleteChoice: deleteChoiceReducer,
    updateChoice: updateChoiceReducer,
    listGoals: listGoalsReducder,
    addGoal: addGoalsReducder,
    deleteGoal:  deleteGoalReducer,
    updateGoal: updateGoalReducer,
    listMonthlyGoals:listMonthlyGoalsReducer,
    addMonthlyGoal: addMonthlyGoalsReducder,
    deleteMonthlyGoal: deleteMonthlyGoalsReducer,
    updateMonthlyGoal: updateMonthlyGoalReducer,
    listHabits: listOfHabitsReducer,
    listObservations: listOfObservationsReducer,
    addObservation:addObservationReducer,
    updateObservation: updateObservationReducer,
    deleteObservation: deleteObservationReducer,
    addHabit: addHabitReducer,
    deleteHabit: deleteHabitReducer,
    updateHabit: updateHabitReducer,
  });
 


export default rootReducer;
