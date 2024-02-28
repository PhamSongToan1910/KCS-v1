import axios from "axios";
import axiosInstance from "../api";

const API_URL = "https://kcsonline.top/api/v1/auto-chat";

const token = localStorage.getItem('token')
export const getAllChat = async () => {
  try {
    const response = await axiosInstance.get(API_URL)
    return response.data;
  } catch (error) {
    console.error("Error fetching autoChat:", error);
    throw error;
  }
};

export const getChatById = async (ChatId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${ChatId}`)
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${ChatId}:`, error);
    throw error;
  }
};

export const addChat = async (autoChat) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/create`, autoChat)
    return response.data;
  } catch (error) {
    console.error("Error adding autoChat:", error);
    throw error;
  }
};

export const updateChat = async (autoChat) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update/${autoChat.id}`,
      autoChat)

    return response.data;
  } catch (error) {
    console.error(
      `Error updating autchat with ID ${autoChat.id} :`, error
    );
    throw error;
  }
};

export const removeChat = async (chatId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/delete/${chatId}`);

    return response.data;
  } catch (error) {
    console.error(`Error removing autoChat with ID ${chatId}:`, error);
    throw error;
  }
};
