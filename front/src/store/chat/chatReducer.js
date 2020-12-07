import {
  FETCH_CHAT_ERROR,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  SET_CHAT_MESSAGES,
  SET_CHAT_USERS,
} from "./../actionsTypes";

const initialState = {
  messages: [],
  users: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_MESSAGES:
      return { ...state, messages: [...state.messages, ...action.data] };
    case SET_CHAT_USERS:
      return { ...state, users: action.data };
    case FETCH_CHAT_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_CHAT_SUCCESS:
      return { ...state, isLoading: false };
    case FETCH_CHAT_ERROR:
      return { ...state, isLoading: false, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
