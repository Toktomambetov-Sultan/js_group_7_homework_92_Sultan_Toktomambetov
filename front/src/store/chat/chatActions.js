import {
  DELETE_MESSAGE,
  FETCH_CHAT_ERROR,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  SET_CHAT_MESSAGES,
  SET_CHAT_USERS,
} from "./../actionsTypes";
const fetchRequest = () => {
  return {
    type: FETCH_CHAT_REQUEST,
  };
};

const fetchSuccess = () => {
  return {
    type: FETCH_CHAT_SUCCESS,
  };
};

const fetchError = (error) => {
  return { type: FETCH_CHAT_ERROR, error };
};

const setMessages = (data) => {
  return {
    type: SET_CHAT_MESSAGES,
    data,
  };
};

const setUsers = (data) => {
  return {
    type: SET_CHAT_USERS,
    data,
  };
};


export const wsOnMessage = (message) => {
  console.log();
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case "INIT":
          dispatch(setMessages(data.messages));
          break;
        case "GET_MESSAGE":
          dispatch(setMessages(data.messages));
          break;
        case "CHANGE_USERS":
          dispatch(setUsers(data.users));
          break;
        case "DELETE_MESSAGE":
          dispatch(setMessages(data.messages));
          break;
        default:
          console.log("Wrong type.");
      }
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
