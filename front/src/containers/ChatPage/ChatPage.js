import { Grid, List, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessageForm from "../../components/Chat/ChatMessageForm.js/ChatMessageForm";
import MessageItem from "../../components/Chat/MessageItem/MessageItem";
import Sidebar from "../../components/Chat/Sidebar/Sidebar";
import config from "../../config";
import { wsOnMessage } from "../../store/chat/chatActions";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "600px",
  },
  messages: {
    border: "3px solid grey",
    borderRadius: "5px",
    flexGrow: "1",
    overflowY: "scroll",
  },
}));

const ChatPage = () => {
  const classes = useStyles();
  const ws = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const state = useSelector((state) => state.chat);

  const [currentMessage, setCurrentMessage] = useState({
    text: "",
  });

  useEffect(() => {
    ws.current = new WebSocket(config.ChatUrl + "?token=" + user?.token);
    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          type: "INIT",
        })
      );
    };
    ws.current.onmessage = (message) => dispatch(wsOnMessage(message));
    return () => ws.current.close();
  }, [user?.token, dispatch]);

  const onChange = (event) => {
    const { value, name } = event.target;
    setCurrentMessage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    ws.current.send(
      JSON.stringify({
        type: "ADD_MESSAGE",
        text: currentMessage.text,
      })
    );
  };
  return (
    <Grid
      container
      direction="row"
      spacing={3}
      className={classes.main}
      alignItems="stretch"
    >
      <Grid item xs={3}>
        <Sidebar users={state.users} />
      </Grid>
      <Grid
        item
        xs={9}
        container
        direction="column"
        justify="space-between"
        spacing={3}
      >
        <Grid item className={classes.messages}>
          <List>
            {state.messages.map((message) => (
              <MessageItem message={message} key={message._id} />
            ))}
          </List>
        </Grid>
        <Grid item>
          <ChatMessageForm
            message={currentMessage}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatPage;
