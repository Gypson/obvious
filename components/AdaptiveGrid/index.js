import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";

const styleSheet = ({ unit }) => ({
  container: {
    display: "grid",
    gridGap: 2 * unit
  },
  container_noGutter: {
    gridGap: 0
  }
});

const AdaptiveGrid = ({
  children,
  breakpoints,
  defaultItemsPerRow,
  noGutter
}) => {
  const [styles, cx] = useStyles(styleSheet);

  const childElements =
    children &&
    React.Children.map(children, (child, idx) =>
      child ? (
        // These items are generic and don't have a guaranteed id or any unique property
        // eslint-disable-next-line react/no-array-index-key
        <div key={idx}>{child}</div>
      ) : null
    );

  const breakpointStyles = {};
  const breakpointKeys = Object.keys(breakpoints);
  const smallestBreakpoint = breakpointKeys.reduce(
    (min, key) => Math.min(min, parseInt(key, 10)),
    10000
  );

  breakpointKeys.forEach(breakpoint => {
    breakpointStyles[`@media (min-width: ${breakpoint}px)`] = {
      gridTemplateColumns: `repeat(${breakpoints[breakpoint]}, 1fr)`
    };
  });

  breakpointStyles[
    breakpointKeys.length > 0
      ? `@media (max-width: ${smallestBreakpoint}px)`
      : "@media (min-width: 0px)"
  ] = {
    gridTemplateColumns: `repeat(${defaultItemsPerRow}, 1fr)`
  };

  return (
    <div
      className={cx(
        styles.container,
        noGutter && styles.container_noGutter,
        breakpointStyles
      )}
    >
      {childElements}
    </div>
  );
};

AdaptiveGrid.propTypes = {
  breakpoints: _pt.objectOf(_pt.number),
  children: _pt.any.isRequired,
  defaultItemsPerRow: _pt.number,
  noGutter: _pt.bool
};

AdaptiveGrid.defaultProps = {
  breakpoints: {},
  defaultItemsPerRow: 1,
  noGutter: false
};

export default AdaptiveGrid;
