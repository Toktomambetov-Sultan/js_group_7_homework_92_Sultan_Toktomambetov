import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    border: "1px solid gray",
    padding: "5px",
  },
  item: {
    borderBottom: "1px solid gray",
  },
}));

const Sidebar = ({ users }) => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <List>
        {users.map((user) => (
          <ListItem className={classes.item} key={user._id}>
            <ListItemText
              primary={user.displayName}
              secondary={user.username}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
