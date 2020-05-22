import React from 'react';
import _pt from 'prop-types';
import { rangeFromDayBundle, rangeToDayBundle, dateMediumBundle } from '../../messages';
import { DateTimeType, Locale } from '../../types';
import DateTime from '../DateTime';
import Empty from '../Empty';
import createDateTime from '../../utils/createDateTime';

const DateTimeRange = ({ from, locale, separator, timezone, to }) => {
  if (!from || !to) {
    return <Empty />;
  }

  const fromTimeStamp = createDateTime(from, { locale, timezone });
  const toTimeStamp = createDateTime(to, { locale, timezone });

  if ('production' !== process.env.NODE_ENV) {
    if (!fromTimeStamp.isValid || !toTimeStamp.isValid) {
      throw new Error('Invalid timestamps passed to `DateTimeRange`.');
    }

    if (toTimeStamp < fromTimeStamp) {
      throw new Error('Invalid chronological order of timestamps passed to `DateTimeRange`.');
    }
  }

  const props = { locale, timezone };
  let fromFormat = rangeFromDayBundle.get(locale);
  let toFormat;
  // eslint-disable-line no-negated-condition
  if (fromTimeStamp.year !== toTimeStamp.year) {
    fromFormat = dateMediumBundle.get(locale);
    toFormat = dateMediumBundle.get(locale);
  } else if (fromTimeStamp.month !== toTimeStamp.month) {
    toFormat = dateMediumBundle.get(locale);
  } else if (fromTimeStamp.day !== toTimeStamp.day) {
    toFormat = rangeToDayBundle.get(locale);
  }

  if (
    fromTimeStamp.year === toTimeStamp.year &&
    fromTimeStamp.month === toTimeStamp.month &&
    fromTimeStamp.day === toTimeStamp.day
  ) {
    return <DateTime {...props} at={toTimeStamp} medium noTime noTimezone />;
  }

  return (
    <span>
      <DateTime {...props} at={fromTimeStamp} format={fromFormat} />
      {separator}
      <DateTime {...props} at={toTimeStamp} format={toFormat} />
    </span>
  );
};

DateTimeRange.propTypes = {
  from: DateTimeType,
  locale: Locale,
  separator: _pt.string,
  timezone: _pt.oneOfType([_pt.string, _pt.bool]),
  to: DateTimeType,
};

DateTimeRange.defaultProps = {
  from: null,
  locale: null,
  separator: ' – ',
  timezone: null,
  to: null,
};

export default DateTimeRange;
