import React from "react";

const Footer = props => {
  return (
    <footer
      className="container"
      style={{
        height: 60
      }}
    >
      {props.children}
    </footer>
  );
};

export default Footer;