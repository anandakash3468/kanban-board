import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addNewTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "./actions/taskActions";
import { RootState } from "../store/store";
import { message } from "antd";
export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  updatedAt: string;
  dueDate: string;
  createdAt: string;
  __v: number;
  stageId: stageId;
  users: Users[];
}
export interface Users {
  avatar: string;
  _id: string;
  name: string;
  email: string;
}

interface stageId {
  _id: string;
  title: string;
  __v: number;
}
interface TasksState {
  tasks: {
    status: string;
    message: string;
    data: Task[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: any = {
  tasks: {},
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tasks";
      })
      .addCase(updateTask.pending, (state) => {
        // state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTasks: any = state.tasks.data.map((task: any) => {
          if (task._id === action.payload.data._id) {
            // Update the task data with the data received from the backend
            return { ...task, ...action.payload.data };
          }
          return task;
        });
        // Update the tasks array in state with the updatedTasks
        return {
          ...state,
          tasks: {
            ...state.tasks,
            data: updatedTasks,
          },
        };
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.message = action.payload.response.data.message;
        if (action.payload.response.data.status === true) {
          message.success(action.payload.response.data.message);
        } else {
          message.error(action.payload.response.data.message);
        }

        state.tasks.data = state.tasks.data.filter(
          (task: any) => task._id !== deletedId
        );
      })
      .addCase(addNewTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.loading = false;
        const newTask = action.payload.data.result;
        if (action.payload.data.status === true) {
          state.tasks.data.push(newTask);
          message.success(action.payload.data.message);
                } else {
          message.error(action.payload.data.message);
          state.error = action.payload.data.message;
          return state;
        }
        return state;
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tasks";
      });
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;

export default tasksSlice.reducer;
