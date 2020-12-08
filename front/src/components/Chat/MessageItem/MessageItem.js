import { IconButton, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

const MessageItem = ({ message, onDelete }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <ListItem>
      <ListItemText
        primary={message.user.displayName}
        secondary={message.text}
      />
      {user.role === "moderator" && (
        <IconButton color="secondary" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      )}
    </ListItem>
  );
};

export default MessageItem;
