import React from "react";
import "./App.css";
import Form from "./Components/Form";
import CssBaseline from "@material-ui/core/CssBaseline";

const form = {
  name: "form",
};

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Form form={form} />
    </div>
  );
}

export default App;
