import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import { logOut } from "../../store/user/userActions";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  displayName: {
    margin: "5px",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <AppBar component={Box} position="static" pb={2} mb={2}>
        <Toolbar>
          <Container>
            <Grid container direction="column">
              <Grid item container justify="space-between" alignItems="center">
                <Typography variant="h4">Chat</Typography>
                {user?.token && (
                  <div>
                    <Grid container alignItems="center" direction="row">
                      <Avatar
                        alt="person image"
                        src={user?.avatarImage || config.usersData.defaultImg}
                      />
                      <Typography className={classes.displayName} variant="h6">
                        {user?.displayName}
                      </Typography>
                    </Grid>
                  </div>
                )}

                {user?.token && (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={logOutHandler}
                    >
                      Log out
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="main" paddingTop="5px">
        <Container>{children}</Container>
      </Box>
    </div>
  );
};

export default Layout;
