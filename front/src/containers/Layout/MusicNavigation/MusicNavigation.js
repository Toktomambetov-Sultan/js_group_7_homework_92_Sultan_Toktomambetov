import { Breadcrumbs, Link as Mlink, Box, makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import config from "../../../config";

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: "18px",
    "&.active": {
      color: "lightgreen",
    },
    "&:hover": {
      textDecoration: "none",
      color: "green",
    },
  },
}));

const MusicNavigation = ({ paths }) => {
  const classes = useStyles();
  return (
    <Box color="#fff">
      <Breadcrumbs color="inherit" aria-label="breadcrumb">
        {paths.map((path) => (
          <Mlink
            key={path.path}
            color="inherit"
            component={NavLink}
            className={classes.link}
            exact
            to={`${config.localUrls.music}/${path.path}`}
          >
            {String(path.title)}
          </Mlink>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default MusicNavigation;
