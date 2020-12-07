import { Grid } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Chat/Sidebar/Sidebar";
import config from "../../config";
import { wsOnMessage } from "../../store/chat/chatActions";

const ChatPage = () => {
  const ws = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const state = useSelector((state) => state.chat);
  useEffect(() => {
    ws.current = new WebSocket(config.ChatUrl + "?token=" + user?.token);
    ws.current.onopen = () => {
      console.log("asd");
      ws.current.send(
        JSON.stringify({
          type: "INIT",
        })
      );
    };
    ws.current.onmessage = (message) => dispatch(wsOnMessage(message));
    return () => ws.current.close();
  }, [user?.token, dispatch]);
  return (
    <Grid container direction="row">
      <Grid item xs={4}>
        <Sidebar users={state.users} />
      </Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  );
};

export default ChatPage;
