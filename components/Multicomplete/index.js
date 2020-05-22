import React from "react";
import shallowEqual from "shallowequal";
import Autocomplete from "../Autocomplete";
import Spacing from "../Spacing";
import Chip from "./private/Chip";

/** FIX THIS NEEDS REFACTORING TO REACT HOOKS */
/** An uncontrolled input field for selecting multiple values via an autocomplete. */
export default class Multicomplete extends React.Component {
  static defaultProps = {
    value: []
  };

  state = {
    values: new Set(this.props.value)
  };

  componentDidUpdate(prevProps) {
    if (!shallowEqual(this.props.value, prevProps.value)) {
      this.setState({
        values: new Set(this.props.value)
      });
    }
  }

  isItemSelected = (item, value) => this.state.values.has(value);

  handleChange = (value, event) => {
    this.props.onChange(Array.from(this.state.values), event);
  };

  handleSelectItem = (value, item, event) => {
    if (this.props.onSelectItem) {
      this.props.onSelectItem(value, item, event);
    }

    if (!value || !item) {
      return;
    }

    this.setState(
      prevState => ({
        values: new Set(prevState.values).add({
          name: item.name,
          value: item.value
        })
      }),
      () => {
        this.props.onChange(Array.from(this.state.values), event);
      }
    );
  };

  handleChipClick = (value, event) => {
    this.setState(
      prevState => {
        const values = new Set(prevState.values);
        values.forEach(item => {
          if (item.name === value) {
            values.delete(item);
          }
        });

        return {
          values
        };
      },
      () => {
        this.props.onChange(Array.from(this.state.values), event);
      }
    );
  };

  render() {
    const { onChange, ...props } = this.props;
    const selected = Array.from(this.state.values);
    return (
      <Autocomplete
        clearOnSelect
        {...props}
        onChange={this.handleChange}
        onSelectItem={this.handleSelectItem}
        isItemSelected={this.isItemSelected}
        value=""
      >
        {selected.length > 0 && (
          <div>
            {selected.map(item => (
              <Spacing inline key={item.value} right={1} top={1}>
                <Chip value={item.name} onClick={this.handleChipClick} />
              </Spacing>
            ))}
          </div>
        )}
      </Autocomplete>
    );
  }
}
