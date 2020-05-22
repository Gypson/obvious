import React from "react";
import _pt from "prop-types";
import useStyles, { aesthetic } from "../../hooks/useStyles";
import Link, { styleSheet } from "../Link";

const newStyleSheet = aesthetic.extendStyles(
  // Base style sheet function
  styleSheet,
  ({ color }) => ({
    ...styleSheet,
    link: {
      color: color.core.neutral[5],

      ":hover": {
        color: color.core.neutral[6]
      }
    }
  })
  // An imported style sheet function
);

const SecondaryLink = ({ children, ...props }) => {
  const [styles] = useStyles(newStyleSheet);
  return (
    <Link override={styles} {...props}>
      {children}
    </Link>
  );
};

SecondaryLink.propTypes = {
  children: _pt.node.isRequired
};

export default SecondaryLink;
