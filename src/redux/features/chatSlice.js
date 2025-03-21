import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    clearChatState: (state) => {
      state.selectedChat = null;
      state.chats = [];
    },
  },
});

export const { setSelectedChat, setChats, clearChatState } = chatSlice.actions;
export default chatSlice;
