import { Button, CssBaseline, Grid, TextField } from "@material-ui/core";
import React, { useRef } from "react";
import { HotKeys } from "react-hotkeys";
import { configure } from "react-hotkeys";

const ChatMessageForm = ({ onChange, message, onSubmit }) => {
  configure({
    ignoreTags: ["div"],
    ignoreKeymapAndHandlerChangesByDefault: false,
    simulateMissingKeyPressEvents: false,
  });
  const keyMap = {
    KEY: "shift+enter",
  };
  const handlers = {
    KEY: (e) => {
      e.preventDefault();
      message.text && onSubmit(e);
    },
  };
  return (
    <div>
      <CssBaseline />
      <form onSubmit={onSubmit}>
        <HotKeys keyMap={keyMap} handlers={handlers}>
          <Grid container wrap="nowrap" alignItems="flex-end">
            <TextField
              required
              fullWidth
              variant="filled"
              name="text"
              value={message.text}
              onChange={onChange}
              multiline
              autoFocus
              label="shift+enter to send"
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Send
            </Button>
          </Grid>
        </HotKeys>
      </form>
    </div>
  );
};

export default ChatMessageForm;
