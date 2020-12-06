import { push } from "connected-react-router";
import axiosOrder from "./../../axiosOrder";
import {
  FETCH_U_REQUEST,
  FETCH_U_SUCCESS,
  FETCH_REGISTRATION_ERROR,
  SET_USER_DATA,
  FETCH_AUTHORIZATION_ERROR,
} from "../actionsTypes";

const redirect = "/chat";

const fetchRequest = () => {
  return {
    type: FETCH_U_REQUEST,
  };
};

const fetchSuccess = () => {
  return {
    type: FETCH_U_SUCCESS,
  };
};

const fetchAuthorizationError = (error) => {
  return {
    type: FETCH_AUTHORIZATION_ERROR,
    error,
  };
};

const fetchRegistrationError = (error) => {
  return {
    type: FETCH_REGISTRATION_ERROR,
    error,
  };
};

const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    data,
  };
};

export const registration = (data) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.post("/users", data);
      dispatch(setUserData(response.data));
      dispatch(fetchSuccess());
      dispatch(push(redirect));
    } catch (error) {
      dispatch(fetchRegistrationError(error.response.data));
    }
  };
};

export const authorization = (data) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.post("/users/sessions", data);
      dispatch(setUserData(response.data));
      console.log(response.data);
      dispatch(fetchSuccess());
      dispatch(push(redirect));
    } catch (error) {
      dispatch(fetchAuthorizationError(error.response?.data));
    }
  };
};

export const logOut = () => {
  return async (dispatch, getState) => {
    dispatch(fetchRequest());
    try {
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.post("/users/log_out", "", { headers });
      dispatch(setUserData(null));
      dispatch(push("/"));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchAuthorizationError(error.response?.data));
      dispatch(setUserData(null));
      dispatch(push("/"));
    }
  };
};

export const getInByGoogle = (data) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      console.log(data);
      const response = await axiosOrder.post("/users/getInByGoogle", data);
      dispatch(setUserData(response.data));
      dispatch(push(redirect));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchAuthorizationError(error.response?.data));
      dispatch(setUserData(null));
      dispatch(push("/"));
    }
  };
};
