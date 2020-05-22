import React from "react";
import _pt from "prop-types";
import Content from "./Content";
import useStyles from "../../hooks/useStyles";

export { Content };

const styleSheet = ({ color, card, pattern }) => ({
  card: {
    ...pattern.box,
    background: card.background,
    overflow: "hidden",
    position: "relative"
  },

  card_overflow: {
    overflow: "visible"
  }
});

const Card = ({ children, overflow, color, fullHeight }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div
      className={cx(
        styles.card,
        overflow && styles.card_overflow,
        color && { backgroundColor: color },
        fullHeight && { height: "100%" }
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: _pt.node.isRequired,
  overflow: _pt.bool
};

Card.defaultProps = {
  overflow: false
};

export default Card;
