import React from "react";
import _pt from "prop-types";
import { requiredBy, mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";
import useTheme from "../../hooks/useTheme";
import IconChevronRight from "../../../../icons/src/interface/IconChevronRight";
import IconFirst from "../../../../icons/src/interface/IconFirst";
import IconLast from "../../../../icons/src/interface/IconLast";
import IconChevronLeft from "../../../../icons/src/interface/IconChevronLeft";
import IconButton from "../IconButton";
import Text from "../Text";
import DirectionalIcon from "../DirectionalIcon";

const alignProp = mutuallyExclusiveTrueProps(
  "centerAlign",
  "endAlign",
  "startAlign"
);

const styleSheet = ({ unit }) => ({
  wrapper: {
    display: "grid",
    gridTemplateAreas: '"previous page next"',
    gridTemplateColumns: "auto 1fr auto",
    gridColumnGap: unit * 2,
    alignItems: "center",
    justifyItems: "center",
  },

  wrapper_endAlign: {
    gridTemplateAreas: '"page previous next"',
    gridTemplateColumns: "auto",
    justifyContent: "end",
  },

  wrapper_centerAlign: {
    gridTemplateColumns: "auto",
    justifyContent: "center",
  },

  wrapper_startAlign: {
    gridTemplateAreas: '"previous next page"',
    gridTemplateColumns: "auto",
    justifyContent: "start",
  },

  page: {
    gridArea: "page",
  },

  previous: {
    gridArea: "previous",
  },

  next: {
    gridArea: "next",
  },
});

const Pagination = ({
  centerAlign,
  endAlign,
  fetching,
  hasNext,
  hasPrev,
  showBookends,
  startAlign,
  pageLabel = "Page",
  onFirst,
  onLast,
  onNext,
  onPrevious,
  page,
  pageCount,
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();

  if (!(hasNext || hasPrev)) {
    return null;
  }

  const previousPage = (
    <IconButton
      active={hasPrev}
      disabled={!hasPrev || fetching}
      onClick={onPrevious}
    >
      <DirectionalIcon
        direction="left"
        left={IconChevronLeft}
        right={IconChevronRight}
        accessibilityLabel="Load previous page"
        size={4 * theme.unit}
      />
    </IconButton>
  );

  const nextPage = (
    <IconButton
      active={hasNext}
      disabled={!hasNext || fetching}
      onClick={onNext}
    >
      <DirectionalIcon
        direction="right"
        left={IconChevronLeft}
        right={IconChevronRight}
        accessibilityLabel="Load next page"
        size={4 * theme.unit}
      />
    </IconButton>
  );

  let firstPage = null;
  let lastPage = null;

  if (showBookends && typeof pageCount === "number") {
    firstPage = (
      <IconButton
        active={hasPrev}
        disabled={page === 1 || fetching}
        onClick={onFirst}
      >
        <DirectionalIcon
          direction="left"
          left={IconFirst}
          right={IconLast}
          accessibilityLabel="Load first page"
          size={4 * theme.unit}
        />
      </IconButton>
    );

    lastPage = (
      <IconButton
        active={hasNext}
        disabled={pageCount < 2 || pageCount === page || fetching}
        onClick={onLast}
      >
        <DirectionalIcon
          direction="right"
          left={IconFirst}
          right={IconLast}
          accessibilityLabel="Load last page"
          size={4 * theme.unit}
        />
      </IconButton>
    );
  }

  let paginationText =
    showBookends && pageCount ? `${pageNumber} of ${pageCount}` : page;

  if (pageLabel) {
    paginationText =
      showBookends && pageCount
        ? `${pageLabel} ${pageNumber} of ${pageCount}`
        : `${pageLabel} ${pageNumber}`;
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        endAlign && styles.wrapper_endAlign,
        centerAlign && styles.wrapper_centerAlign,
        startAlign && styles.wrapper_startAlign
      )}
    >
      <div className={cx(styles.previous)}>
        {firstPage}
        {previousPage}
      </div>
      <div className={cx(styles.page)}>
        <Text muted>{paginationText}</Text>
      </div>
      <div className={cx(styles.next)}>
        {nextPage}
        {lastPage}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  onPrevious: _pt.func.isRequired,
  onNext: _pt.func.isRequired,
  pageLabel: _pt.string,
  page: _pt.number.isRequired,
  showBookends: _pt.bool,
  hasPrev: _pt.bool,
  hasNext: _pt.bool,
  fetching: _pt.bool,
  centerAlign: alignProp,
  endAlign: alignProp,
  startAlign: alignProp,
  onFirst: requiredBy("showBookends", _pt.func),
  onLast: requiredBy("showBookends", _pt.func),
  pageCount: requiredBy("showBookends", _pt.number),
};

Pagination.defaultProps = {
  centerAlign: false,
  endAlign: false,
  fetching: false,
  hasNext: false,
  hasPrev: false,
  onFirst: null,
  onLast: null,
  pageCount: null,
  pageLabel: null,
  showBookends: false,
  startAlign: false,
};

export default Pagination;
