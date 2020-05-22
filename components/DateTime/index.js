import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import createDateTime from "../../utils/createDateTime";
import Interval from "../Interval";
import Empty from "../Empty";
import toMilliseconds from "../../utils/toMilliseconds";
import {
  FORMAT_YMD,
  FORMAT_PREFIX_DAY,
  FORMAT_SUFFIX_TIMEZONE,
} from "../../constants";
import {
  timeBundle,
  dateMicroBundle,
  dateShortBundle,
  dateMediumBundle,
  dateLongBundle,
} from "../../messages";
import { DateTimeType, Locale } from "../../types";

const MINUTE_THRESHOLD = toMilliseconds("1 minute");
const MIN_RELATIVE_DATETIME_REFRESH_INTERVAL = toMilliseconds("5 seconds");
const MAX_RELATIVE_DATETIME_REFRESH_INTERVAL = toMilliseconds("6 hours");

export const format = (props) => {
  const {
    at,
    clock,
    format: baseFormat,
    locale,
    long,
    medium,
    micro,
    noDay,
    noFuture,
    noTime,
    noTimezone,
    relative: baseRelative,
    relativeCompact,
    short,
    sourceFormat,
    timezone,
    withDay,
  } = props;

  if (!at) {
    return "";
  }

  // Render a timestamp
  let timeStamp = createDateTime(at, {
    locale,
    sourceFormat,
    timezone,
  });
  let format = baseFormat || "";
  let affixDay = withDay;
  let affixTime = true;

  if ("production" !== process.env.NODE_ENV) {
    if (!timeStamp.isValid) {
      throw new Error("Invalid timestamp passed to `DateTime`.");
    }
  } // Disable future dates

  if (noFuture) {
    const now = createDateTime(null, { timezone });

    if (timeStamp > now) {
      timeStamp = now;
    }
  }

  // Return early for relative timestamps
  if (baseRelative || relativeCompact) {
    return relative(timeStamp, { style: relativeCompact ? "short" : "long" });
  }

  // Determine base date format
  if (micro) {
    format = dateMicroBundle.get(locale);
  } else if (short) {
    format = dateShortBundle.get(locale);
  } else if (medium) {
    format = dateMediumBundle.get(locale);
  } else if (long) {
    format = dateLongBundle.get(locale);
    affixDay = true;
  } else if (clock) {
    format = timeBundle.get(locale);
    affixTime = false;
  } else {
    return timeStamp.toFormat(format);
  }

  // Prepend day
  if (affixDay && !noDay) {
    format = `${FORMAT_PREFIX_DAY}, ${format}`;
  }

  // Append time
  if (affixTime && !noTime) {
    format += ` ${timeBundle.get(locale)}`;
  }

  // Append timezone
  if (!noTimezone) {
    format += ` ${FORMAT_SUFFIX_TIMEZONE}`;
  }

  return timeStamp.toFormat(format);
};

const diff = (to, from) => {
  if (from === void 0) {
    from = null;
  }

  return (
    createDateTime(to, {
      timezone: "UTC",
    }).toMillis() -
    createDateTime(from, {
      timezone: "UTC",
    }).toMillis()
  );
};

const relative = (timeStamp, options) => {
  if (options === void 0) {
    options = {};
  }

  const relative = createDateTime(timeStamp);
  const d = diff(relative, options.base);
  const fewPhrase =
    options.style === "narrow" ? "a few sec." : "a few seconds.";

  if (d > 0 && d < MINUTE_THRESHOLD) {
    if (!options.style || options.style === "long") {
      return `in ${time}`;
    }

    return fewPhrase;
  }

  if (d <= 0 && d > -MINUTE_THRESHOLD) {
    if (!options.style || options.style === "long") {
      return `${time} ago`;
    }

    return fewPhrase;
  }

  return relative.toRelative(options) || relative.toFormat(FORMAT_YMD);
};

const formatPropType = mutuallyExclusiveTrueProps(
  "clock",
  "micro",
  "short",
  "medium",
  "long",
  "relative",
  "relativeCompact"
);
const DateTime = ({ ...props }) => {
  const getRefreshInterval = () => {
    const { at, sourceFormat } = props;
    const difference = Math.abs(diff(createDateTime(at, { sourceFormat })));

    // Decay refresh rate based on how long its been since the given timestamp
    // < 1 minute: update every 5 seconds
    // 10 minutes: update every 1 minute
    // 1 hour: update every 6 minutes
    // 1 day: update every 2.4 hours
    // > 2 day: update every 6 hours
    return Math.min(
      Math.max(difference / 10, MIN_RELATIVE_DATETIME_REFRESH_INTERVAL),
      MAX_RELATIVE_DATETIME_REFRESH_INTERVAL
    );
  };

  const rfc = () => {
    const { at, sourceFormat } = props;

    return createDateTime(at, { sourceFormat }).toFormat(
      "yyyy-MM-dd'T'HH:mm:ssZZ"
    ); // RFC3339
  };

  const renderTimeElement = () => {
    const formatted = format(props);

    if (!formatted) {
      return <Empty />;
    }

    return <time dateTime={rfc()}>{formatted}</time>;
  };

  const { relative: baseRelative } = props;

  if (!baseRelative) {
    return renderTimeElement();
  }

  return (
    <Interval key={rfc()} every={getRefreshInterval()}>
      {renderTimeElement}
    </Interval>
  );
};

DateTime.propTypes = {
  at: DateTimeType,
  clock: formatPropType,
  format: _pt.string,
  locale: Locale,
  long: formatPropType,
  medium: formatPropType,
  micro: formatPropType,
  noDay: _pt.bool,
  noFuture: _pt.bool,
  noTime: _pt.bool,
  noTimezone: _pt.bool,
  relative: formatPropType,
  relativeCompact: formatPropType,
  short: formatPropType,
  sourceFormat: _pt.string,
  timezone: _pt.oneOfType([_pt.string, _pt.bool]),
  withDay: _pt.bool,
};

DateTime.defaultProps = {
  at: null,
  clock: false,
  format: FORMAT_YMD,
  locale: null,
  long: false,
  medium: false,
  micro: false,
  noDay: false,
  noFuture: false,
  noTime: false,
  noTimezone: false,
  relative: false,
  relativeCompact: false,
  short: false,
  sourceFormat: "",
  timezone: null,
  withDay: false,
};

export default DateTime;
