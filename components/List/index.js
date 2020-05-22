import React from "react";
import _pt from "prop-types";
import Item from "./Item";
import useStyles from "../../hooks/useStyles";

const styleSheet = () => ({
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    width: "100%"
  },

  list_center: {
    alignItems: "center"
  },

  list_end: {
    alignItems: "end"
  },

  list_horizontal: {
    display: "flex"
  },

  list_horizontal_center: {
    justifyContent: "center"
  },

  list_horizontal_end: {
    justifyContent: "flex-end"
  },

  list_horizontal_wrap: {
    flexWrap: "wrap"
  }
});

const List = ({ children, horizontal, ordered, wrap, center, end }) => {
  const [styles, cx] = useStyles(styleSheet);
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag
      className={cx(
        styles.list,
        horizontal && styles.list_horizontal,
        horizontal && wrap && styles.list_horizontal_wrap,
        center && !horizontal && styles.list_center,
        center && horizontal && styles.list_horizontal_center,
        end && !horizontal && styles.list_end,
        end && horizontal && styles.list_horizontal_end
      )}
    >
      {React.Children.map(children, child => {
        if (!child) {
          return null;
        }

        if (horizontal) {
          return React.cloneElement(child, { horizontal });
        }

        return child;
      })}
    </Tag>
  );
};

List.propTypes = {
  center: _pt.bool,
  children: _pt.any.isRequired,
  end: _pt.bool,
  horizontal: _pt.bool,
  ordered: _pt.bool,
  wrap: _pt.bool
};

List.defaultProps = {
  center: false,
  end: false,
  horizontal: false,
  ordered: false,
  wrap: false
};

export { Item };
export default List;
