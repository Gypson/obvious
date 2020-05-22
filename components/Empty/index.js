import React from 'react';
import Text from '../Text';

const EMPTY = (
  <Text small light muted inline>
    —
  </Text>
);

const Empty = () => {
  return EMPTY;
};

export default React.memo(Empty);
