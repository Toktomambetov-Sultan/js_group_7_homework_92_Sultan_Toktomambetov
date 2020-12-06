import {
  Button,
  Grid,
  Link as Mlink,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MusicNavigation from "../MusicNavigation/MusicNavigation";
import { NavLink } from "react-router-dom";
import { push } from "connected-react-router";

const parseMusicTree = (data) => {
  const list = [];
  if (data.album) {
    list.push(
      { path: "", title: data.album.author.name },

      { path: `${data.album.author._id}`, title: data.album.name },
      {
        path: `${data.album.author._id}/${data.album._id}`,
        title: "Tracks",
      }
    );
  } else if (data.author) {
    list.push(
      { path: "", title: data.author.name },
      { path: `${data.author._id}`, title: "Albums" }
    );
  } else {
    list.push({
      path: "",
      title: "Authors",
    });
  }
  return list;
};

const useStyles = makeStyles((theme) => ({
  userPanel: {
    minHeight: 0,
    height: 0,
    maxHeight: "1000px",
    transitionDuration: "height 150ms",
    overflow: "hidden",
    "&.active": {
      height: "auto",
    },
  },
  link: {
    fontSize: "20px",
    color: "white",
    "&.active": {
      color: "lightgreen",
    },
    "&:hover": {
      textDecoration: "none",
      color: "green",
    },
  },
  button: {
    fontSize: "15px",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "green",
    },
  },
}));

const UserPanel = ({ open }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.music);
  const changePath = (path) => {
    setAnchorEl(null);
    dispatch(push(path));
  };
  return (
    <Grid
      container
      className={[classes.userPanel, open ? "active" : ""].join(" ")}
      justify="space-evenly"
      alignItems="center"
    >
      <MusicNavigation paths={parseMusicTree(state.parentData)} />
      <Mlink
        component={NavLink}
        to="/track_history"
        exact
        className={classes.link}
      >
        Track history
      </Mlink>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        className={classes.button}
      >
        Create
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={() => changePath("/add_author")}>Author</MenuItem>
        <MenuItem onClick={() => changePath("/add_album")}>Album</MenuItem>
        <MenuItem onClick={() => changePath("/add_track")}>Track</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserPanel;
