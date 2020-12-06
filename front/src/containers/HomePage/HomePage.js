import React from "react";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import { Box, Container, Grid } from "@material-ui/core";
import AuthorizationPage from "../AuthorizationPage/AuthorizationPage";
import config from "../../config";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { getInByGoogle } from "../../store/user/userActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const getInByGoogleHandler = (data) => dispatch(getInByGoogle(data));
  const responseGoogle = (data) => getInByGoogleHandler(data);
  return (
    <Container>
      <Box pt={10}>
        <Grid container direction="column" spacing={5} alignItems="center">
          <Grid item container spacing={5}>
            <Grid item xs={12} md={6}>
              <RegistrationPage />
            </Grid>
            <Grid item xs={12} md={6}>
              <AuthorizationPage />
            </Grid>
          </Grid>
          <GoogleLogin
            clientId={config.GoogleClientId}
            buttonText="or get in with Google"
            cookiePolicy={"single_host_origin"}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          ></GoogleLogin>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
