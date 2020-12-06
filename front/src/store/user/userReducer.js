import {
  FETCH_AUTHORIZATION_ERROR,
  FETCH_REGISTRATION_ERROR,
  FETCH_U_REQUEST,
  FETCH_U_SUCCESS,
  SET_USER_DATA,
} from "../actionsTypes";

const InittialState = {
  user: null,
  authorizationError: null,
  registrationError: null,
  isLoading: false,
};
const reducer = (state = InittialState, action) => {
  switch (action.type) {
    case FETCH_U_REQUEST:
      return {
        ...state,
        isLoading: true,
        authorizationError: null,
        registrationError: null,
      };
    case FETCH_U_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_AUTHORIZATION_ERROR: {
      return {
        ...state,
        isLoading: false,
        authorizationError: action.error,
      };
    }
    case FETCH_REGISTRATION_ERROR: {
      return {
        ...state,
        isLoading: false,
        registrationError: action.error,
      };
    }
    case SET_USER_DATA:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
