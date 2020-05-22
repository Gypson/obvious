import React from 'react';
import _pt from 'prop-types';

// If there's no idle frame within 2 seconds, force calling
// the tick anyway, to prevent a poor user experience.
const FORCE_TICK_CALL = 2000;

const Interval = ({ children, every }) => {
  const [now, setNow] = React.useState(Date.now());
  let ric = 0;
  let timer = 0;

  React.useEffect(() => {
    timer = window.setTimeout(tick, every);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }

      if (ric) {
        window.cancelIdleCallback(ric);
      }
    };
  }, []);

  const tick = () => {
    timer = 0;
    ric = window.requestIdleCallback(
      () => {
        ric = 0;
        setNow(Date.now());
        timer = window.setTimeout(tick, every);
      },
      { timeout: FORCE_TICK_CALL },
    );
  };

  return children(now);
};

Interval.propTypes = {
  every: _pt.number.isRequired,
  children: _pt.func.isRequired,
};

export default Interval;
