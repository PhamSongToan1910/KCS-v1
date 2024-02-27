import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as autoChatService from '../../services/AutoChatService';

export const getAllChat = createAsyncThunk("autoChat/getAll", async () => {
  return autoChatService.getAllChat();
});

export const getChatById = createAsyncThunk("autoChat/autoChatById", async (ChatId) => {
  return autoChatService.getChatById(ChatId);
});

export const addChat = createAsyncThunk("autoChat/addChat", async (autoChat) => {
  return autoChatService.addChat(autoChat);
});

export const updateChat = createAsyncThunk("autoChat/updateChat", async (updateChat) => {
  return autoChatService.updateChat(updateChat);
});

export const removeChat = createAsyncThunk("autoChat/removechat", async (chatId) => {
  return autoChatService.removeChat(chatId);
});

const autoChatSlice = createSlice({
  name: "autoChat",
  initialState: {
    autoChatList: [],
    autoChat: null,
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    search: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChat.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllChat.fulfilled, (state, action) => {
        state.loading = false;
        state.autoChatList = action.payload;
      })
      .addCase(getAllChat.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(getChatById.fulfilled, (state, action) => {
        state.loading = false;
        state.autoChat = action.payload;
      })
      .addCase(addChat.fulfilled, (state, action) => {
        state.loading = false;
        state.autoChatList.push(action.payload);
      })
      .addCase(updateChat.fulfilled, (state, action) => {
        state.loading = false;
        state.autoChat = action.payload;
      })
      .addCase(removeChat.fulfilled, (state, action) => {
        state.loading = false;
        const chatIndex = state.autoChatList.findIndex(
          (chat) => chat.id === action.payload.id
        );
        if (chatIndex !== -1) {
          state.autoChatList[chatIndex] = action.payload;
        }
      });
  },
});

//dkhfaldjflfakj

export const { search } = autoChatSlice.actions; // Extracting the search action
export default autoChatSlice.reducer;
