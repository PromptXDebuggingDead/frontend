import API from "../../utils/API";
import { setSelectedChat, setChats } from "../features/chatSlice";
import axios from "axios";

export const fetchChats = () => async (dispatch, getState) => {
  try {
    const { user } = getState().user;
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    
    const { data } = await API.get("/chat", config);
    dispatch(setChats(data));
  } catch (error) {
    console.error("Error fetching chats:", error);
  }
};

export const accessChat = (userID) => async (dispatch, getState) => {
  try {
    const { user } = getState().user;
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    
    const { data } = await API.post("/chat/", { userID }, config);
    dispatch(setSelectedChat(data));
  } catch (error) {
    console.error("Error accessing chat:", error);
  }
};
