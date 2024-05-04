import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../tasksSlice";
import { API_URLS } from "../../apiUrl/apilist";
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get<any>(
    "http://localhost:8000/api/v1/tasks/getTasks"
  );
  return response.data;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, stageId }: { id: string; stageId: any }) => {
    const data = {
      id: id,
      stageId: stageId,
    };
    const response = await axios.put<any>(
      `http://localhost:8000/api/v1/tasks/updateTask/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string) => {
  const response = await axios.delete(
    `${API_URLS.BASE_URL}/${API_URLS.DELETE_TASK}/${id}`
  );
  return {response,id};
});


export const addNewTask= createAsyncThunk("tasks/addNewTask", async (data: any) => {
  const response = await axios.post(
    `${API_URLS.BASE_URL}${API_URLS.ADD_NEW_TASKS}`,data
  );
  return response
})