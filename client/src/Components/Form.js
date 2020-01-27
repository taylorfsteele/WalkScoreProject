import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loadAddress() {
  const res = await fetch("http://localhost:3001/address");
  const address = await res.json();
}

export default function Form({ form }) {
  const classes = useStyles();
  // Library for Form Data
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    fetch("http://localhost:3001/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      )
  // Send to server
};
return (
  <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
        <TextField
          //Reference for useForm and field name
          inputRef={register({ required: true })}
          name="address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          autoComplete="address"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
          </Button>
      </form>
    </div>
  </Container>
);
}
