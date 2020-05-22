import React from "react";
import _pt from "prop-types";
import uuid from "uuid/v4";
import { DateTime } from "luxon";
import useStyles from "../../hooks/useStyles";
import BaseSelect from "../basic/BaseSelect";
import FormField, { partitionFieldProps } from "../FormField";
import createRange from "../../utils/createRange";
import createDateTime from "../../utils/createDateTime";
import getMonths from "../../utils/getMonths";
import { Locale } from "../../types";

const styleSheet = ({ unit }) => ({
  selects: {
    display: "flex",
    width: "100%",
    alignItems: "center",

    "@selectors": {
      "> div": {
        flexGrow: 0,
        width: "auto",
      },
    },
  },

  spacer: {
    paddingLeft: unit / 2,
    paddingRight: unit / 2,
  },
});

const DateTimeSelect = ({
  enable12HourClock,
  locale,
  minuteStep,
  timezone,
  value,
  yearFutureBuffer,
  yearPastBuffer,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const createDate = createDateTime(value, {
    locale,
    timezone,
  }).set({ minute: 0, second: 0 });
  const [id] = React.useState(uuid());
  const [date, setDate] = React.useState(createDate);
  const [meridiem, setMeridiem] = React.useState(
    date.get("hour") <= 11 ? "am" : "pm"
  );

  React.useEffect(() => {
    setDate(createDate);
    setMeridiem(date.get("hour") <= 11 ? "am" : "pm");
  }, [value]);

  const getDayRange = () => {
    return createRange(1, date.daysInMonth).map((day) => ({
      label: day,
      value: String(day),
    }));
  };

  const getCurrentValue = (date, key) => {
    let value = Number(date.get(key));

    if (key === "meridiem") {
      value = meridiem;
    } else if (key === "hour" && enable12HourClock) {
      if (value === 0) {
        value = 12;
      } else if (value > 12) {
        value -= 12;
      }
    }

    return String(value);
  };

  const getHourRange = () => {
    return (enable12HourClock ? createRange(1, 12) : createRange(0, 23)).map(
      (hour) => ({
        label: hour,
        value: hour,
      })
    );
  };

  const getMinuteRange = () => {
    return createRange(0, 59, minuteStep).map((minute) => ({
      label: minute.padStart(2, "0"),
      value: minute,
    }));
  };

  const getMonthRange = () => {
    return getMonths().map((month, i) => ({
      label: month,
      value: String(i + 1),
    }));
  };

  const getYearRange = () => {
    const now = createDateTime();

    return createRange(now.year - yearPastBuffer, now.year + yearFutureBuffer)
      .reverse()
      .map((year) => ({
        label: year,
        value: year,
      }));
  };

  const handleChange = (value, event) => {
    const { id } = event.target;
    const key = id.split("_")[1];

    let newDate = date;
    let newMeridiem = key === "meridiem" ? value : meridiem;

    if (enable12HourClock && (key === "hour" || key === "meridiem")) {
      let hour = Number(key === "hour" ? value : newDate.get("hour"));

      if (hour <= 12 && meridiem === "pm") {
        hour += 12;

        if (hour === 24) {
          hour = 12;
        }
      } else if (hour >= 12 && meridiem === "am") {
        hour -= 12;
      }

      newDate = newDate.set({ hour });
    } else {
      newDate = newDate.set({ [key]: value });
    }

    setDate(newDate);
    setMeridiem(newMeridiem);
  };

  const { fieldProps, inputProps } = partitionFieldProps(props);
  const { name, hideDate, hideTime, hideYear, ...restProps } = inputProps;

  return (
    <FormField {...fieldProps} id={id}>
      <div className={cx(styles.selects)}>
        {!hideDate && (
          <>
            <BaseSelect
              {...restProps}
              id={`${id}_month`}
              name={`${name}[month]`}
              value={getCurrentValue(date, "month")}
              placeholder="Month"
              onChange={handleChange}
            >
              {getMonthRange().map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </BaseSelect>

            <div className={cx(styles.spacer)} />

            <BaseSelect
              {...restProps}
              id={`${id}_day`}
              name={`${name}[day]`}
              value={getCurrentValue(date, "day")}
              placeholder="Day"
              onChange={handleChange}
            >
              {getDayRange().map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </BaseSelect>

            <div className={cx(styles.spacer)} />

            {!hideYear && (
              <BaseSelect
                {...restProps}
                id={`${id}_year`}
                name={`${name}[year]`}
                value={getCurrentValue(date, "year")}
                placeholder="Year"
                onChange={handleChange}
              >
                {getYearRange().map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </BaseSelect>
            )}

            {!hideTime && (
              <>
                <div className={cx(styles.spacer)} />
                <div className={cx(styles.spacer)} />
              </>
            )}
          </>
        )}

        {!hideTime && (
          <>
            <BaseSelect
              {...restProps}
              id={`${id}_hour`}
              name={`${name}[hour]`}
              value={getCurrentValue(date, "hour")}
              placeholder="Hour"
              onChange={handleChange}
            >
              {getHourRange().map((hour) => (
                <option key={hour.value} value={hour.value}>
                  {hour.label}
                </option>
              ))}
            </BaseSelect>

            <div className={cx(styles.spacer)}>:</div>

            <BaseSelect
              {...restProps}
              id={`${id}_minute`}
              name={`${name}[minute]`}
              value={getCurrentValue(date, "minute")}
              placeholder="Minute"
              onChange={handleChange}
            >
              {getMinuteRange().map((minute) => (
                <option key={minute.value} value={minute.value}>
                  {minute.label}
                </option>
              ))}
            </BaseSelect>

            {enable12HourClock && (
              <>
                <div className={cx(styles.spacer)} />

                <BaseSelect
                  {...restProps}
                  id={`${id}_meridiem`}
                  name={`${name}[meridiem]`}
                  value={getCurrentValue(date, "meridiem")}
                  placeholder="Meridiem"
                  onChange={handleChange}
                >
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </BaseSelect>
              </>
            )}
          </>
        )}
      </div>
    </FormField>
  );
};

DateTimeSelect.propTypes = {
  enable12HourClock: _pt.bool,
  hideDate: _pt.bool,
  hideYear: _pt.bool,
  hideTime: _pt.bool,
  locale: Locale,
  minuteStep: _pt.number,
  placeholder: _pt.string,
  onChange: _pt.func,
  timezone: _pt.oneOfType([_pt.string, _pt.bool]),
  yearFutureBuffer: _pt.number,
  yearPastBuffer: _pt.number,
  value: _pt.oneOfType([
    _pt.string,
    _pt.number,
    _pt.instanceOf(Date),
    _pt.instanceOf(DateTime),
  ]),
};

DateTimeSelect.defaultProps = {
  enable12HourClock: false,
  hideDate: false,
  hideTime: false,
  hideYear: false,
  locale: null,
  minuteStep: 5,
  onChange: null,
  placeholder: null,
  timezone: null,
  value: null,
  yearFutureBuffer: 5,
  yearPastBuffer: 80,
};

export default DateTimeSelect;
