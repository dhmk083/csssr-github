import React from "react";

const Stack = ({ children, flex = false, gap = "0.5em" }) => (
  <div style={flex ? { display: "flex" } : {}}>
    {React.Children.map(children, (x) =>
      x ? React.cloneElement(x, { ...x.props, style: { marginRight: gap } }) : x
    )}
  </div>
);

export default Stack;
