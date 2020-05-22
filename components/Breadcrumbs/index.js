import React from "react";
import _pt from "prop-types";
import List from "../List";
import Breadcrumb from "./Breadcrumb";

export { Breadcrumb };

const Breadcrumbs = ({ children, accessibilityLabel }) => {
  return (
    <nav aria-label={accessibilityLabel}>
      <List horizontal ordered center>
        {children}
      </List>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  accessibilityLabel: _pt.string.isRequired,
  children: _pt.any.isRequired
};

export default Breadcrumbs;
