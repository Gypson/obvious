import React from 'react';
import _pt from 'prop-types';
import { childrenOfType } from 'airbnb-prop-types';
import Card, { Content } from '../Card';
import Text from '../Text';
import ProgressBar from '../ProgressBar';
import SteppedProgressBar from '../SteppedProgressBar';
import Spacing from '../Spacing';

const ProgressCard = ({ children, progress, title }) => {
  return (
    <Card>
      <Content>
        <Text large bold>
          {title}
        </Text>

        {children && <Spacing top={1}>{children}</Spacing>}

        <Spacing top={1.5}>{progress}</Spacing>
      </Content>
    </Card>
  );
};

ProgressCard.propTypes = {
  children: _pt.node,
  progress: childrenOfType(ProgressBar, SteppedProgressBar).isRequired,
  title: _pt.node.isRequired,
};

ProgressCard.defaultProps = {
  children: null,
};

export default ProgressCard;
