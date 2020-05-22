import React from 'react';
import _pt from 'prop-types';
import uuid from 'uuid/v4';
import FormField, { partitionFieldProps } from '../FormField';
import { format as changeFormat } from '../DateTime';
import createDateTime from '../../utils/createDateTime';
import { mdyCalendarBundle } from '../../messages';
import PrivatePickerInput from './Input';
import { Locale } from '../../types';

const DatePickerInput = ({ ...props }) => {
  const [id] = React.useState(uuid());
  const handleChange = event => {
    const { value } = event.currentTarget;
    const date = parseDate(value);

    props.onChange(value, date || null, event);
  };

  const handleDayChange = day => {
    // Day is undefined when the user is typing into the field
    // manually. We want to avoid overriding `onChange`.
    if (!day) {
      return;
    }

    // Update the parent form with the selected value.
    // We also don't have a real event object, so fake it.
    props.onChange(formatDate(day), day, {});
  };

  const getFormat = () => {
    return props.format || mdyCalendarBundle.get(props.locale);
  };

  const parseDate = (value, format, locale) => {
    try {
      return createDateTime(value, {
        sourceFormat: format || getFormat(),
        locale: locale || props.locale,
      }).toJSDate();
    } catch (error) {
      return undefined;
    }
  };

  const formatDate = (date, baseFormat, locale) => {
    const format = baseFormat || getFormat();

    return changeFormat({
      at: date,
      format,
      sourceFormat: format,
      locale: locale || props.locale,
      noTime: true,
      noTimezone: true,
    });
  };

  const { fieldProps, inputProps } = partitionFieldProps(props);
  const {
    clearOnDayClick,
    datePickerProps,
    dropdownProps,
    hideOnDayClick,
    locale,
    onHidePicker,
    ...restProps
  } = inputProps;
  const format = getFormat();
  const pickerProps = { ...datePickerProps, locale };

  return (
    <FormField {...fieldProps} id={id}>
      <PrivatePickerInput
        clickUnselectsDay={clearOnDayClick}
        dayPickerProps={pickerProps}
        dropdownProps={dropdownProps}
        inputProps={{
          ...restProps,
          id,
          onChange: handleChange,
        }}
        format={format}
        formatDate={formatDate}
        hideOnDayClick={hideOnDayClick}
        keepFocus
        onDayChange={handleDayChange}
        onDayPickerHide={onHidePicker}
        parseDate={parseDate}
        placeholder={restProps.placeholder || format.toUpperCase()}
        value={restProps.value}
      />
    </FormField>
  );
};

DatePickerInput.propTypes = {
  datePickerProps: _pt.any,
  dropdownProps: _pt.any,
  format: _pt.string,
  locale: Locale,
  onChange: _pt.func.isRequired,
  value: _pt.oneOfType([_pt.string, _pt.instanceOf(Date)]),
};

DatePickerInput.defaultProps = {
  datePickerProps: null,
  dropdownProps: null,
  format: null,
  locale: 'en',
  value: '',
};

export default DatePickerInput;
