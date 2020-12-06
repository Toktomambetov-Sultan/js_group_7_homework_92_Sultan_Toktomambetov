import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
});

const FileUploader = ({ onChange, name, label, error, required }) => {
  const classes = useStyles();
  const inputRef = useRef();
  const [filename, setFilename] = useState("");
  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    onChange && onChange(e);
  };
  const activateInput = () => {
    inputRef.current.click();
  };
  return (
    <>
      <input
        type="file"
        name={name}
        accept="image/*"
        className={classes.input}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            required={required}
            fullWidth
            error={error}
            label={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileUploader;
