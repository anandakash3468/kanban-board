import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../redux/tasksSlice';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;