import axios from "axios";
import axiosInstance from "../api";

const API_URL = "https://kcsonline.top/api/v1/user";


export const fetchUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${userId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

export const fetchUserByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/find-by-email/${email}`);
    // console.log(response.data)
    return response.data;
  } catch (error) { 
    console.error(`Error fetching user with ID ${email}:`, error);
    return null;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(API_URL)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchCurrentUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/user-current/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

export const addUser = async (userData) => {

  try {
    const response = await axiosInstance.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update/${updatedUser.id}`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating user with ID ${updatedUser.id} :`,
      updatedUser,
      error
    );
    throw error;
  }
};
export const updateCurrentUser = async (updatedUser) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update-current/${updatedUser.id}`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating user with ID ${updatedUser.id} :`,
      updatedUser,
      error
    );
    throw error;
  }
};

export const removeUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing user with ID ${userId}:`, error);
    throw error;
  }
};
