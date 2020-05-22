import React from "react";
import _pt from "prop-types";
import { NavLink } from "react-router-dom";
import useStyles from "../../hooks/useStyles";
import { Align, Justify, FlexWrap, FlexDirection } from "../../types";

//FIX THIS create a way for NavLink to pass active props to children

const styleSheet = () => ({
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "inline-block",
    width: "100%"
  }
});

const RouterNavLink = ({
  to,
  flex,
  wrap,
  direction,
  align,
  justify,
  children,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <NavLink to={to} className={cx(styles.link)}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { ...props });
      })}
    </NavLink>
  );
};

RouterNavLink.propTypes = {
  to: _pt.string.isRequired,
  children: _pt.node.isRequired,
  align: Align,
  justify: Justify,
  flex: _pt.bool,
  wrap: FlexWrap,
  direction: FlexDirection
};

RouterNavLink.defaultProps = {
  align: "start",
  direction: "row",
  flex: false,
  justify: "start",
  wrap: "no-wrap"
};

export default RouterNavLink;
