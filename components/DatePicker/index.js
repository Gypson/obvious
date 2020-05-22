import React from 'react';
import _pt from 'prop-types';
import DayPicker from 'react-day-picker';
import useStyles, { aesthetic } from '../../hooks/useStyles';
import datePickerStyles from '../basic/datePickerStyles';
import { Locale } from '../../types';
import getMonths from '../../utils/getMonths';
import getWeekdays from '../../utils/getWeekdays';
import { getClassNames, getCustomModifiers } from '../../utils/datePicker';
import NavBar from './Picker/NavBar';

const styleSheet = aesthetic.extendStyles(datePickerStyles);

const DatePicker = ({ ...props }) => {
  const {
    disabledDays,
    firstDayOfWeek,
    fromMonth,
    initialMonth,
    locale,
    modifiers,
    month,
    numberOfMonths,
    onBlur,
    onDayClick,
    onDayMouseEnter,
    onFocus,
    onMonthChange,
    onResetClick,
    onTodayButtonClick,
    pagedNavigation,
    selectedDays,
    showResetButton,
    todayButton,
    toMonth,
  } = props;
  const [styles, cx] = useStyles(styleSheet);

  return (
    <DayPicker
      fixedWeeks={Boolean(numberOfMonths && numberOfMonths > 1)}
      classNames={getClassNames('calendar', styles, cx, props)}
      disabledDays={disabledDays}
      firstDayOfWeek={firstDayOfWeek}
      fromMonth={fromMonth}
      initialMonth={initialMonth}
      locale={locale}
      modifiers={getCustomModifiers(modifiers, styles, cx)}
      month={month}
      months={getMonths()}
      navbarElement={props => (
        <NavBar
          {...props}
          noFooter={!todayButton}
          showResetButton={showResetButton}
          onResetClick={onResetClick}
        />
      )}
      numberOfMonths={numberOfMonths}
      onBlur={onBlur}
      onDayClick={onDayClick}
      onDayMouseEnter={onDayMouseEnter}
      onFocus={onFocus}
      onMonthChange={onMonthChange}
      onTodayButtonClick={onTodayButtonClick}
      pagedNavigation={pagedNavigation}
      selectedDays={selectedDays}
      todayButton={todayButton}
      toMonth={toMonth}
      weekdaysLong={getWeekdays('long', true)}
      weekdaysShort={getWeekdays('short', true)}
    />
  );
};

DatePicker.propTypes = {
  disabledDays: _pt.oneOfType([_pt.instanceOf(Date), _pt.object, _pt.bool]),
  firstDayOfWeek: _pt.number,
  fromMonth: _pt.instanceOf(Date),
  initialMonth: _pt.instanceOf(Date),
  locale: Locale,
  modifiers: _pt.object,
  month: _pt.instanceOf(Date),
  numberOfMonths: _pt.number,
  pagedNavigation: _pt.bool,
  selectedDays: _pt.oneOfType([_pt.instanceOf(Date), _pt.object, _pt.bool]),
  showResetButton: _pt.bool,
  todayButton: _pt.string,
  toMonth: _pt.instanceOf(Date),
  onBlur: _pt.func,
  onDayClick: _pt.func,
  onDayMouseEnter: _pt.func,
  onFocus: _pt.func,
  onMonthChange: _pt.func,
  onResetClick: _pt.func,
  onTodayButtonClick: _pt.func,
};

DatePicker.defaultProps = {
  disabledDays: {},
  firstDayOfWeek: 0,
  fromMonth: null,
  initialMonth: new Date(),
  locale: 'en',
  modifiers: null,
  month: null,
  numberOfMonths: 1,
  onBlur: null,
  onDayClick: null,
  onDayMouseEnter: null,
  onFocus: null,
  onMonthChange: null,
  onResetClick: null,
  onTodayButtonClick: null,
  pagedNavigation: false,
  selectedDays: null,
  showResetButton: false,
  todayButton: null,
  toMonth: null,
};

export default DatePicker;
