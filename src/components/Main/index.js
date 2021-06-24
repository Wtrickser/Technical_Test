import React from "react";

const Main = props => {
  return (
    <main className="container d-flex flex-column py-3">{props.children}</main>
  );
};

export default Main;