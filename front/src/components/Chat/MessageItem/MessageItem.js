import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";

const MessageItem = ({ message }) => {
  return (
    <ListItem>
      <ListItemText
        primary={message.user.displayName}
        secondary={message.text}
      />
    </ListItem>
  );
};

export default MessageItem;
