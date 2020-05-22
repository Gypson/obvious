import React from "react";
import _pt from "prop-types";
import { childrenOfType } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";
import iconComponent from "../../prop-types/iconComponent";
import Button from "../Button";
import IconButton from "../IconButton";
import ExpandableIcon from "../ExpandableIcon";
import Dropdown from "../Dropdown";
import Menu, { Item, Separator } from "../Menu";

const styleSheet = ({ transition, unit }) => ({
  container: {
    display: "inline-block",
    position: "relative"
  },

  dropdown: {
    ...transition.fade,
    visibility: "visible",
    position: "relative"
  },

  dropdown_hidden: {
    opacity: 0,
    visibility: "hidden",
    userSelect: "none"
  },

  menu: {
    marginTop: unit
  },

  controls: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const MenuToggle = ({
  accessibilityLabel,
  children,
  closeOnClick,
  dropdownProps = { right: 0 },
  ignoreClickOutside,
  inverted,
  large,
  menuProps,
  onShow,
  onHide,
  small,
  toggleIcon,
  toggleLabel,
  zIndex
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const ref = React.createRef;
  const [opened, setOpened] = React.useState(false);

  const handleItemClick = onClick => {
    if (onClick) {
      onClick();
    }
    handleHideMenu();
  };

  const handleToggleMenu = () => {
    if (opened) {
      handleHideMenu();
    } else {
      handleShowMenu();
    }
  };

  const handleShowMenu = () => {
    setOpened(true);

    if (onShow) {
      onShow();
    }
  };

  const handleHideMenu = () => {
    setOpened(false);

    if (onHide) {
      onHide();
    }
  };

  const handleClickOutside = event => {
    if (!opened || ignoreClickOutside) {
      return;
    }

    // Let the button handle itself
    const { current } = ref;

    if (current && current.contains(event.target)) {
      return;
    }

    handleHideMenu();
  };

  let iconSize = "1.5em";

  if (large) {
    iconSize = "2em";
  } else if (small) {
    iconSize = "1em";
  }

  return (
    <div className={cx(styles.container)} ref={ref}>
      {toggleIcon ? (
        <IconButton aria-label={accessibilityLabel} onClick={handleToggleMenu}>
          {toggleIcon}
        </IconButton>
      ) : (
        <Button
          afterIcon={<ExpandableIcon expanded={opened} size={iconSize} />}
          inverted={inverted}
          large={large}
          small={small}
          onClick={handleToggleMenu}
        >
          {toggleLabel}
        </Button>
      )}

      <div
        className={cx(styles.dropdown, !opened && styles.dropdown_hidden, {
          zIndex
        })}
        aria-expanded={opened}
      >
        <Dropdown
          {...dropdownProps}
          onClickOutside={handleClickOutside}
          visible={opened}
        >
          <div className={cx(styles.menu)}>
            <Menu
              minWidth={250}
              maxHeight={300}
              accessibilityLabel={accessibilityLabel}
              {...menuProps}
            >
              {closeOnClick
                ? React.Children.map(children, child => {
                    if (!child || !child.props) {
                      return null;
                    }

                    return React.cloneElement(child, {
                      onClick: () => handleItemClick(child.props.onClick)
                    });
                  })
                : children}
            </Menu>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

MenuToggle.propTypes = {
  zIndex: _pt.number,
  toggleLabel: _pt.any.isRequired,
  small: _pt.bool,
  onShow: _pt.func,
  onHide: _pt.func,
  menuProps: _pt.any,
  large: _pt.bool,
  inverted: _pt.bool,
  ignoreClickOutside: _pt.bool,
  dropdownProps: _pt.any,
  closeOnClick: _pt.bool,
  accessibilityLabel: _pt.string.isRequired,
  children: childrenOfType(Item, Separator, "li").isRequired,
  toggleIcon: iconComponent
};

MenuToggle.defaultProps = {
  closeOnClick: false,
  ignoreClickOutside: false,
  inverted: false,
  large: false,
  menuProps: null,
  onHide: false,
  onShow: false,
  small: false,
  toggleIcon: null,
  zIndex: 1
};

export { Item, Separator };
export default MenuToggle;
