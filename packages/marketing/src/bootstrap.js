import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";

const mount = (el) => {
  ReactDom.render(<App />, el);
};

if (
  process.env.NODE_ENV === "development" &&
  document.querySelector("#_dev_marketing")
) {
  console.log(process.env.NODE_ENV);
  const element = document.querySelector("#_dev_marketing");
  mount(element);
}

export default mount;
