import axios from 'axios';

import {getAllScheduleSuccess, getAllScheduleStart, getAllScheduleError, getScheduleByIDStart, getScheduleByIDError, getScheduleByIDSuccess} from "../redux/slices/ScheduleSlice"
import {updateScheduleError, updateScheduleStart, updateScheduleSusscess} from "../redux/slices/ScheduleSlice"
import {createScheduleError, createScheduleStart, createScheduleSuccess} from "../redux/slices/ScheduleSlice"
import {deleteScheduleError, deleteScheduleStart, deleteScheduleSuccess} from "../redux/slices/ScheduleSlice"
import axiosInstance from '../api';

const API_URL = 'https://kcsonline.top/api/v1/schedule';
export const fetchSchedule = async (dispatch) => {
  dispatch(getAllScheduleStart())
  try {
    const response = await axiosInstance.get(API_URL)
    console.log(response.data);
    dispatch(getAllScheduleSuccess(response.data));
  } catch (error) {
    console.error('Error fetching users:', error);
    dispatch(getAllScheduleError());
  }
};

export const fetchScheduleById = async (ScheduleId, dispatch) => {
  dispatch(getScheduleByIDStart())
  try {
    const response = await axiosInstance.get(`${API_URL}/${ScheduleId}`)
    console.log(response.data);
    dispatch(getScheduleByIDSuccess(response.data));
  } catch (error) {
    console.error(`Error fetching user with ID ${ScheduleId}:`, error);
    dispatch(getScheduleByIDError());
  }
};

export const addSchedule = async (ScheduleData, dispatch, navigate) => {
  dispatch(createScheduleStart())
  try {
    const response = await axiosInstance.post(API_URL, ScheduleData)
    dispatch(createScheduleSuccess(response.data));
  } catch (error) {
    console.error('Error adding user:', error);
    // throw error;
    dispatch(createScheduleError())
  }
};

export const updateSchedule = async (updatedSchedule, dispatch) => {
  dispatch(updateScheduleStart())
  try {
    const response = await axiosInstance.put(`${API_URL}/update/${updatedSchedule.id}`, updatedSchedule);
    dispatch(updateScheduleSusscess(response.data));
  } catch (error) {
    console.error(`Error updating user with ID ${updatedSchedule.id} :`, updatedSchedule ,error);
    dispatch(updateScheduleError())
  }
};

export const removeSchedule = async (ScheduleId, dispatch) => {
  dispatch(deleteScheduleStart())
  try {
    const response = await axiosInstance.delete(`${API_URL}/delete/${ScheduleId}`)
    dispatch(deleteScheduleSuccess(response.data))
  } catch (error) {
    console.error(`Error removing user with ID ${ScheduleId}:`, error);
    // throw error;
    dispatch(deleteScheduleError())
  }
};
