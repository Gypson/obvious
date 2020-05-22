import React from "react";
import _pt from "prop-types";
import IconCloseAlt from "../../../../../icons/src/interface/IconCloseAlt";
import Chip from "../../Chip";

const MulticompleteChip = ({ onClick, value }) => {
  const handleClick = event => {
    onClick(value, event);
  };

  return (
    <Chip
      afterIcon={<IconCloseAlt decorative size="2em" />}
      onIconClick={handleClick}
    >
      {value}
    </Chip>
  );
};

MulticompleteChip.propTypes = {
  value: _pt.string,
  onClick: _pt.func
};

export default MulticompleteChip;
