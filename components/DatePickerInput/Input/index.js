import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import FormInput from '../../basic/FormInput';
import Dropdown from '../../Dropdown';
import DatePicker from '../../DatePicker';

//** REFECTOR */

export default class PrivatePickerInput extends DayPickerInput {
  constructor() {
    super(...arguments);
    this.props = void 0;
    this.daypicker = null;
    this.input = null;
    this.loadInputRef = ref => {
      const { propagateRef } = this.props.inputProps;
      this.input = ref;

      if (propagateRef) {
        propagateRef.current = ref;
      }
    };

    this.loadInputRef = ref => {
      this.daypicker = ref;
    };

    this.handleResetClick = () => {
      this.updateState(new Date(), '', this.hideAfterDayClick);
    };

    this.handleTodayButtonClick = () => {
      this.updateState(new Date(), this.props.formatDate(new Date()), this.hideAfterDayClick);
    };

    this.renderOverlay = () => {
      const { dayPickerProps = {}, dropdownProps = {} } = this.props;
      const { selectedDays, value } = this.state;
      let selectedDay;

      if (!selectedDays && value) {
        const day = this.props.parseDate(value);

        if (day) {
          selectedDay = day;
        }
      } else if (selectedDays) {
        selectedDay = selectedDays;
      }

      return (
        <Dropdown
          top="100%"
          zIndex={100}
          {...dropdownProps}
          onFocus={this.handleOverlayFocus}
          onBlur={this.handleOverlayBlur}
        >
          <DatePicker
            ref={this.loadPickerRef}
            {...dayPickerProps}
            month={this.state.month}
            selectedDays={selectedDay}
            onDayClick={this.handleDayClick}
            onMonthChange={this.handleMonthChange}
            onResetClick={this.handleResetClick}
            onTodayButtonClick={this.handleTodayButtonClick}
          />
        </Dropdown>
      );
    };
  }

  render() {
    const { inputProps } = this.props;

    return (
      <>
        <FormInput
          type="text"
          tagName="input"
          placeholder={this.props.placeholder}
          {...inputProps}
          value={this.state.typedValue || this.state.value}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
          onKeyUp={this.handleInputKeyUp}
          onClick={this.handleInputClick}
          propagateRef={this.loadInputRef}
        />

        {this.state.showOverlay && this.renderOverlay()}
      </>
    );
  }
}
