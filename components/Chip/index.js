import React from 'react';
import _pt from 'prop-types';
import { mutuallyExclusiveProps, requiredBy } from 'airbnb-prop-types';
import iconComponent from '../../prop-types/iconComponent';
import useStyles from '../../hooks/useStyles';
import ProfilePhoto from '../ProfilePhoto';
import ButtonOrLink from '../basic/ButtonOrLink';

const styleSheet = ({ color, font, pattern, transition, ui, unit }) => ({
  chip: {
    ...transition.box,
    ...font.textSmall,
    backgroundColor: color.accent.bg,
    border: ui.border,
    borderRadius: unit * 4,
    display: 'inline-block',
    height: unit * 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },

  chip_noBefore: {
    paddingLeft: unit,
  },

  chip_noAfter: {
    paddingRight: unit,
  },

  chip_active: {
    background: color.core.primary[3],
    borderColor: color.core.primary[3],
    color: color.accent.bg,
  },

  chip_active_button: {
    '@selectors': {
      ':not([disabled]):hover': {
        backgroundColor: color.core.primary[4],
      },
    },
  },

  chip_compact: {
    borderRadius: 2,
    padding: `0 ${unit}`,
    height: 3 * unit,
  },

  chip_disabled: {
    backgroundColor: color.core.neutral[1],
    cursor: 'normal',
    borderColor: color.core.neutral[1],
  },

  chip_button: {
    cursor: 'pointer',
    padding: 0,

    '@selectors': {
      ':not([disabled]):active': {
        boxShadow: ui.boxShadow,
      },

      ':not([disabled]):hover': {
        backgroundColor: color.accent.bgHover,
      },
    },

    ':focus': {
      backgroundColor: color.accent.bgHover,
      outline: 'none',
    },
  },

  chipItem: {
    height: '100%',
    verticalAlign: 'middle',
  },

  content: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    marginLeft: unit,
    marginRight: unit,
  },

  iconWrapper: {
    color: color.core.neutral[3],
  },

  iconWrapperAfter: {
    padding: `${unit * 0.5}px ${unit * 0.5}px ${unit * 0.5}px 0`,
  },

  iconWrapperBefore: {
    padding: `${unit * 0.5}px ${unit * 0.5}px ${unit * 0.5}px ${unit}px`,
  },

  iconButton: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],

    ':hover': {
      color: color.core.primary[3],
    },

    ':focus': {
      color: color.core.primary[3],
      outline: 'none',
    },
  },

  iconButton_disabled: {
    ...pattern.disabled,

    ':hover': {
      color: color.core.neutral[6],
    },
  },

  sideContent: {
    display: 'inline-block',
  },

  sideContentInner: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
});

const Chip = ({
  active,
  afterIcon,
  beforeIcon,
  children,
  compact,
  disabled,
  onClick,
  onIconClick,
  profileImageSrc,
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const Component = onClick ? 'button' : 'div';
  const shouldRenderBefore = beforeIcon || profileImageSrc;
  const props =
    Component === 'button'
      ? {
          disabled,
          onClick,
          type: 'button',
        }
      : {};

  return (
    // @ts-ignore [ts] JSX element type 'Component' does not have any construct or call signatures. [2604]
    <Component
      className={cx(
        styles.chip,
        onClick && styles.chip_button,
        !shouldRenderBefore && styles.chip_noBefore,
        !afterIcon && styles.chip_noAfter,
        active && styles.chip_active,
        onClick && active && styles.chip_active_button,
        compact && styles.chip_compact,
        disabled && styles.chip_disabled,
      )}
      {...props}
    >
      {shouldRenderBefore && (
        <div className={cx(styles.chipItem, styles.sideContent)}>
          <div
            className={cx(
              styles.sideContentInner,
              !!beforeIcon && styles.iconWrapper,
              !!beforeIcon && styles.iconWrapperBefore,
            )}
          >
            {profileImageSrc && <ProfilePhoto imageSrc={profileImageSrc} title="" size={4} />}
            {beforeIcon}
          </div>
        </div>
      )}
      <div className={cx(styles.chipItem, styles.content)}>{children}</div>
      {afterIcon && (
        <div className={cx(styles.chipItem, styles.sideContent)}>
          <div className={cx(styles.sideContentInner, styles.iconWrapper, styles.iconWrapperAfter)}>
            {onIconClick ? (
              <ButtonOrLink
                className={cx(styles.iconButton, disabled && styles.iconButton_disabled)}
                disabled={disabled}
                onClick={onIconClick}
              >
                {afterIcon}
              </ButtonOrLink>
            ) : (
              afterIcon
            )}
          </div>
        </div>
      )}
    </Component>
  );
};

Chip.propTypes = {
  onIconClick: _pt.func,
  disabled: _pt.bool,
  children: _pt.any.isRequired,
  active: _pt.bool,
  afterIcon: requiredBy('onIconClick', iconComponent),
  beforeIcon: mutuallyExclusiveProps(_pt.node, 'beforeIcon', 'profileImageSrc'),
  onClick: mutuallyExclusiveProps(_pt.func, 'onIconClick'),
  profileImageSrc: mutuallyExclusiveProps(_pt.any, 'beforeIcon', 'profileImageSrc', 'compact'),
  compact: mutuallyExclusiveProps(_pt.any, 'profileImageSrc', 'compact'),
};

Chip.defaultProps = {
  active: false,
  afterIcon: null,
  beforeIcon: null,
  compact: null,
  disabled: false,
  onClick: null,
  onIconClick: null,
  profileImageSrc: null,
};

export default Chip;
