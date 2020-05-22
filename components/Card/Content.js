import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveProps } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";
import Row from "../Row";
import Spacing from "../Spacing";

const imageUrlTypePropType = mutuallyExclusiveProps(
  _pt.string,
  "beforeImageSrc",
  "afterImageSrc",
  "topImageSrc"
);

const afterPropType = mutuallyExclusiveProps(
  _pt.oneOfType([_pt.node, imageUrlTypePropType]),
  "after",
  "afterImageSrc"
);

const beforePropType = mutuallyExclusiveProps(
  _pt.oneOfType([_pt.node, imageUrlTypePropType]),
  "before",
  "beforeImageSrc"
);

const styleSheet = ({ color, card, pattern, ui, unit }) => ({
  container: {
    borderBottom: ui.border,

    ":last-child": {
      borderBottom: 0
    }
  },

  container_button: {
    ...pattern.resetButton,
    borderBottom: ui.border,
    display: "block",
    textAlign: "left",
    width: "100%",

    "@selectors": {
      ":hover, :focus": {
        backgroundColor: card.backgroundHover,
        outline: "none"
      }
    }
  },

  side: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingTop: unit * 3,
    paddingBottom: unit * 3
  },

  side_compact: {
    paddingTop: unit * 1.5,
    paddingBottom: unit * 1.5
  },

  after: {
    paddingRight: unit * 3
  },

  after_compact: {
    paddingRight: unit * 1.5
  },

  before: {
    paddingLeft: unit * 3
  },

  before_compact: {
    paddingLeft: unit * 1.5
  },

  image: {
    display: "block",
    objectFit: "cover"
  },

  imageWrapper: {
    height: "100%",
    width: 80,
    overflow: "hidden"
  },

  imageWrapper_large: {
    width: 195
  },

  topImage: {
    height: 105
  },

  topImage_large: {
    height: 195
  }
});

const CardContent = ({
  after,
  afterImageSrc,
  before,
  beforeImageSrc,
  children,
  compact,
  large,
  maxHeight,
  middleAlign,
  truncated,
  topImageSrc,
  onClick
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const ContainerTag = onClick ? "button" : "div";
  const props = onClick ? { type: "button", onClick } : {};
  const spacing = compact ? 1.5 : 3;
  const horizontalSpacing = compact ? 0 : 1;

  let afterContent = after ? (
    <div
      className={cx(
        styles.side,
        compact && styles.side_compact,
        styles.after,
        compact && styles.after_compact
      )}
    >
      {after}
    </div>
  ) : null;

  if (!afterContent && afterImageSrc) {
    afterContent = (
      <div
        className={cx(styles.imageWrapper, large && styles.imageWrapper_large)}
      >
        <img
          className={cx(styles.image)}
          alt=""
          height="100%"
          src={afterImageSrc}
          width="100%"
        />
      </div>
    );
  }

  let beforeContent = before ? (
    <div
      className={cx(
        styles.side,
        compact && styles.side_compact,
        styles.before,
        compact && styles.before_compact
      )}
    >
      {before}
    </div>
  ) : null;

  if (!beforeContent && beforeImageSrc) {
    beforeContent = (
      <div
        className={cx(styles.imageWrapper, large && styles.imageWrapper_large)}
      >
        <img
          className={cx(styles.image)}
          alt=""
          height="100%"
          src={beforeImageSrc}
          width="100%"
        />
      </div>
    );
  }

  return (
    // @ts-ignore [ts] JSX element type 'ContainerTag' does not have any construct or call signatures. [2604]
    <ContainerTag
      {...props}
      className={cx(styles.container, onClick && styles.container_button)}
    >
      {topImageSrc && (
        <div className={cx(styles.topImage, large && styles.topImage_large)}>
          <img
            className={cx(styles.image)}
            alt=""
            height="100%"
            src={topImageSrc}
            width="100%"
          />
        </div>
      )}

      <Row
        after={afterContent}
        before={beforeContent}
        maxHeight={maxHeight}
        middleAlign={middleAlign}
        truncated={truncated}
      >
        <Spacing
          inner
          left={beforeContent ? horizontalSpacing : spacing}
          right={afterContent ? horizontalSpacing : spacing}
          vertical={spacing}
        >
          {children}
        </Spacing>
      </Row>
    </ContainerTag>
  );
};

CardContent.propTypes = {
  onClick: _pt.func,
  truncated: _pt.bool,
  middleAlign: _pt.bool,
  maxHeight: _pt.oneOfType([_pt.number, _pt.string]),
  large: _pt.bool,
  compact: _pt.bool,
  children: _pt.any.isRequired,
  after: afterPropType,
  afterImageSrc: imageUrlTypePropType,
  before: beforePropType,
  beforeImageSrc: imageUrlTypePropType,
  topImageSrc: imageUrlTypePropType
};

CardContent.defaultProps = {
  after: null,
  afterImageSrc: null,
  before: null,
  beforeImageSrc: null,
  compact: null,
  large: null,
  maxHeight: null,
  middleAlign: false,
  onClick: null,
  topImageSrc: null,
  truncated: false
};

export default CardContent;
