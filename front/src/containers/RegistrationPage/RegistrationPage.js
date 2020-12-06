import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../../components/UserForm/UserForm";
import { registration } from "../../store/user/userActions";

const RegistrationPage = () => {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const registrationHandler = (data) => dispatch(registration(data));
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });
  const onChange = (event) => {
    const { value, name } = event.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await registrationHandler(currentUser);
    setCurrentUser((prevState) => ({
      ...prevState,
      password: "",
    }));
  };
  return (
    <UserForm
      title="Sing up"
      icon={<LockOpenRoundedIcon />}
      error={state.registrationError?.errors}
      user={currentUser}
      color="blue"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegistrationPage;
