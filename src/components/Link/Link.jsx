// import react
import React from "react";
import { Link as GatsbyLink } from "gatsby";
// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ to, activeClassName, partiallyActive, ...props }) => (
  <GatsbyLink
    to={to}
    activeClassName={activeClassName}
    partiallyActive={partiallyActive}
    {...props}
  />
);
export default Link;
