import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import Step from './Step';

const styleSheet = () => ({
  bar: {
    display: 'flex',
  },
});

const SteppedProgressBar = ({ children }) => {
  const [styles, cx] = useStyles(styleSheet);
  const steps = React.Children.count(children);

  return (
    <div className={cx(styles.bar)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          first: index === 0,
          last: index === steps - 1,
        }),
      )}
    </div>
  );
};

SteppedProgressBar.propTypes = {
  children: childrenOfType(Step).isRequired,
};

export { Step };
export default SteppedProgressBar;
