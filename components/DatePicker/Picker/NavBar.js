import React from "react";
import _pt from "prop-types";
import useStyles, { aesthetic } from "../../../hooks/useStyles";
import IconArrowLeft from "../../../../../icons/src/interface/IconArrowLeft";
import IconArrowRight from "../../../../../icons/src/interface/IconArrowRight";
import datePickerStyles from "../../basic/datePickerStyles";
import DirectionalIcon from "../../DirectionalIcon";
import IconButton from "../../IconButton";

const styleSheet = aesthetic.extendStyles(datePickerStyles);

const NavBar = ({
  className,
  classNames,
  labels,
  noFooter,
  onNextClick,
  onPreviousClick,
  onResetClick,
  showNextButton,
  showPreviousButton,
  showResetButton,
}) => {
  const [styles, cx] = useStyles(styleSheet);

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePreviousClick = () => {
    onPreviousClick();
  };

  const handleResetClick = () => {
    if (onResetClick) {
      onResetClick();
    }
  };

  return (
    <div className={className}>
      {showPreviousButton && (
        <div className={classNames.navButtonPrev}>
          <IconButton
            tooltip={labels.previousMonth}
            onClick={handlePreviousClick}
          >
            <DirectionalIcon
              direction="left"
              left={IconArrowLeft}
              right={IconArrowRight}
              size="1.25em"
              accessibilityLabel={labels.previousMonth}
            />
          </IconButton>
        </div>
      )}

      {showNextButton && (
        <div className={classNames.navButtonNext}>
          <IconButton tooltip={labels.nextMonth} onClick={handleNextClick}>
            <DirectionalIcon
              direction="right"
              left={IconArrowLeft}
              right={IconArrowRight}
              size="1.25em"
              accessibilityLabel={labels.nextMonth}
            />
          </IconButton>
        </div>
      )}

      {showResetButton && (
        <div
          className={cx(
            styles.resetButton,
            noFooter && styles.resetButton_noFooter
          )}
        >
          <button
            className={cx(styles.todayButton)}
            type="button"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

NavBar.propTypes = {
  className: _pt.any,
  classNames: _pt.any,
  labels: _pt.any,
  noFooter: _pt.bool,
  onNextClick: _pt.func,
  onPreviousClick: _pt.func,
  onResetClick: _pt.func,
  showNextButton: _pt.bool,
  showPreviousButton: _pt.bool,
  showResetButton: _pt.bool,
};

NavBar.defaultProps = {
  className: null,
  classNames: null,
  labels: null,
  noFooter: false,
  onNextClick: null,
  onPreviousClick: null,
  onResetClick: null,
  showNextButton: false,
  showPreviousButton: false,
  showResetButton: false,
};

export default NavBar;
