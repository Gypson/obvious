import React from "react";
import _pt from "prop-types";
import uuid from "uuid/v4";
import debouncePromise from "debounce-promise";
import toMilliseconds from "../../utils/toMilliseconds";
import BaseInput from "../basic/BaseInput";
import ErrorMessage from "../ErrorMessage";
import FormField, { partitionFieldProps } from "../FormField";
import Loader from "../Loader";
import Menu, { Item as MenuItem, Row as MenuRow } from "../Menu";
import Spacing from "../Spacing";
import Text from "../Text";
import renderElementOrFunction from "../../utils/renderElementOrFunction";

export const CACHE_DURATION = toMilliseconds("5 minutes");

function getItemValue(item) {
  return String(item.value || item.id);
}

function renderItem(item) {
  return <Text>{item.name || item.title || item.value}</Text>;
}

//Needs to be refactored

export default class Autocomplete extends React.Component {
  static defaultProps = {
    autoFocus: false,
    clearOnSelect: false,
    debounce: 250,
    disableCache: false,
    getItemValue,
    isItemSelectable() {
      return true;
    },
    isItemSelected() {},
    loadItemsOnFocus: false,
    loadItemsOnMount: false,
    onMenuVisibilityChange() {},
    onSelectItem() {},
    renderItem
  };

  cache = {};

  ignoreBlur = false;

  ignoreFocus = false;

  inputRef = React.createRef();

  state = {
    error: null,
    highlightedIndex: null,
    id: uuid(),
    items: [],
    loading: false,
    open: false,
    value: this.props.value || "",
    fetching: this.props.fetching || false
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focusInput();
    }

    if (this.props.loadItemsOnMount) {
      this.loadItems(this.state.value, true, this.focusInput);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { highlightedIndex, open, value } = this.state;

    if (
      highlightedIndex !== null &&
      highlightedIndex >= this.getFilteredItems(this.state).length
    ) {
      this.setState({
        highlightedIndex: null
      });
    }

    if (this.props.value !== prevProps.value) {
      this.loadItems(this.props.value || "");
    }

    if (
      value !== prevState.value ||
      (value !== "" && highlightedIndex === null)
    ) {
      this.maybeAutoCompleteText(this.state);
    }

    if (open !== prevState.open) {
      this.props.onMenuVisibilityChange(open);
    }

    if (this.props.fetching !== prevProps.fetching) {
      this.loadItems(value || "");
    }
  }

  focusInput = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  handleInputBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    if (this.inputRef.current && this.ignoreBlur) {
      this.ignoreFocus = true;
      this.inputRef.current.focus();

      return;
    }

    this.setState({
      open: false,
      highlightedIndex: null
    });

    this.props.onChange(this.state.value, event);
  };

  handleInputChange = (value, event) => {
    this.setState({ value }, () => {
      this.loadItems(value);
      this.props.onChange(value, event);
    });
  };

  handleInputClick = event => {
    const { open } = this.state;
    const { current } = this.inputRef;

    if (
      current &&
      current.ownerDocument &&
      current === current.ownerDocument.activeElement &&
      !open
    ) {
      this.setState({
        open: true
      });
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleInputFocus = event => {
    const { value } = this.state;

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    if (this.props.loadItemsOnFocus) {
      this.loadItems(value);
    }

    this.setState({
      open: true
    });
  };

  handleInputKeyDown = event => {
    const { key } = event;

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    if (key === "ArrowDown") this.handleInputKeyDownArrowDown(event);
    else if (key === "ArrowUp") this.handleInputKeyDownArrowUp(event);
    else if (key === "Enter") this.handleInputKeyDownEnter(event);
    else if (key === "Escape") this.handleInputKeyDownEscape();
    else if (key === "Tab") this.handleInputKeyDownTab();
    else if (!this.state.open) {
      this.setState({
        open: true
      });
    }
  };

  handleInputKeyDownArrowDown = event => {
    event.preventDefault();

    const items = this.getFilteredItems(this.state);

    if (items.length === 0) {
      return;
    }

    const { highlightedIndex } = this.state;
    const { isItemSelectable } = this.props;
    let index = highlightedIndex === null ? -1 : highlightedIndex;

    for (let i = 0, j = items.length; i < j; i += 1) {
      const p = (index + i + 1) % items.length;

      if (isItemSelectable(items[p])) {
        index = p;
        break;
      }
    }

    if (index > -1 && index !== highlightedIndex) {
      this.setState({
        highlightedIndex: index,
        open: true
      });
    }
  };

  handleInputKeyDownArrowUp = event => {
    event.preventDefault();

    const items = this.getFilteredItems(this.state);

    if (items.length === 0) {
      return;
    }

    const { highlightedIndex } = this.state;
    const { isItemSelectable } = this.props;
    let index = highlightedIndex === null ? items.length : highlightedIndex;

    for (let i = 0, j = items.length; i < j; i += 1) {
      const p = (index - (1 + i) + items.length) % items.length;

      if (isItemSelectable(items[p])) {
        index = p;
        break;
      }
    }

    if (index !== items.length) {
      this.setState({
        highlightedIndex: index,
        open: true
      });
    }
  };

  handleInputKeyDownEnter = event => {
    // Key code 229 is used for selecting items from character selectors (Pinyin, Kana, etc)
    if (event.keyCode !== 13) {
      return;
    }

    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);

    if (!this.state.open) {
      // Menu is closed so there is no selection to accept -> do nothing
      return;
    }

    const { highlightedIndex } = this.state;

    if (highlightedIndex === null) {
      // Input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
      this.setState(
        {
          open: false
        },
        () => {
          if (this.inputRef.current) {
            this.inputRef.current.select();
          }
        }
      );
    } else {
      // Text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
      event.preventDefault();

      const item = this.getFilteredItems(this.state)[highlightedIndex];
      const value = this.props.getItemValue(item);

      this.setState(
        {
          highlightedIndex: null,
          open: false,
          value
        },
        () => this.handleSelect(value, item, event)
      );
    }
  };

  handleInputKeyDownEscape = () => {
    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);

    this.setState({
      highlightedIndex: null,
      open: false
    });
  };

  handleInputKeyDownTab = () => {
    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);
  };

  handleItemMouseEnter = index => {
    this.setState({
      highlightedIndex: index
    });
  };

  handleItemMouseDown = (item, event) => {
    const value = this.props.getItemValue(item);

    // The menu will de-render before a mouseLeave event
    // happens. Clear the flag to release control over focus
    this.setIgnoreBlur(false);

    this.setState(
      {
        highlightedIndex: null,
        open: false,
        value
      },
      () => this.handleSelect(value, item, event)
    );
  };

  handleSelect = (value, item, event) => {
    this.props.onSelectItem(value, item, event);
    this.props.onChange(value, event);

    if (this.props.clearOnSelect) {
      this.setState({
        value: ""
      });
    }
  };

  getFilteredItems(state) {
    const { shouldItemRender } = this.props;
    const { value } = state;
    let { items } = state;

    if (shouldItemRender) {
      items = items.filter(item => shouldItemRender(item, value || ""));
    }

    return items;
  }

  getInputProps(props) {
    const {
      compact,
      disabled,
      invalid,
      name,
      optional,
      placeholder,
      onBlur,
      onFocus,
      small
    } = props;
    const { id } = this.state;

    // Should match the props passed within `Input`
    return {
      compact,
      disabled,
      id,
      invalid,
      name,
      onBlur,
      onFocus,
      optional,
      placeholder: placeholder || "Search",
      small,
      type: "text"
    };
  }

  loadItems = (value, force = false, callback) => {
    this.setState({
      value,
      error: null,
      items: [],
      loading: true
    });

    const { disableCache, loadItemsOnFocus, fetching } = this.props;

    if (fetching) {
      return;
    }

    // Exit early if no value
    if (!value && !force && !loadItemsOnFocus) {
      this.props.onSelectItem("", null);
      return Promise.resolve([]);
    }

    // Use cache if it exists
    if (
      !force &&
      this.cache[value] &&
      this.cache[value].time + CACHE_DURATION > Date.now()
    ) {
      const { items } = this.cache[value];

      this.setState({
        items,
        loading: false
      });

      return Promise.resolve(items);
    }

    // Attempt to fetch items
    return this.loadItemsDebounced(value)
      .then(({ input, response }) => {
        let items = [];

        if (Array.isArray(response)) {
          items = response;
        } else {
          items = response.results || response.items || [];
        }

        if (!disableCache) {
          this.cache[input] = {
            items,
            time: Date.now()
          };
        }

        const nextState = {
          items,
          loading: false
        };

        if (callback) {
          this.setState(nextState, callback);
        } else {
          this.setState(nextState);
        }

        return items;
      })
      .catch(error => {
        this.setState({
          error,
          loading: false
        });
      });
  };

  loadItemsDebounced = debouncePromise(
    /* istanbul ignore next */
    input =>
      Promise.resolve(this.props.onLoadItems(input)).then(response => ({
        input,
        response
      })),
    this.props.debounce
  );

  maybeAutoCompleteText = state => {
    const { highlightedIndex, value } = state;
    const { isItemSelectable } = this.props;
    let index = highlightedIndex === null ? 0 : highlightedIndex;
    const items = this.getFilteredItems(state);

    for (let i = 0, j = items.length; i < j; i += 1) {
      if (isItemSelectable(items[index])) {
        break;
      }

      index = (index + 1) % items.length;
    }

    const matchedItem =
      items[index] && isItemSelectable(items[index]) ? items[index] : "whoops";

    if (value && value !== "" && matchedItem) {
      const itemValue = this.props.getItemValue(matchedItem);
      const itemValueDoesMatch =
        itemValue.toLowerCase().indexOf(String(value).toLowerCase()) === 0;

      if (itemValueDoesMatch) {
        this.setState({
          highlightedIndex: index
        });
      }
    } else if (highlightedIndex !== null) {
      this.setState({
        highlightedIndex: null
      });
    }
  };

  setIgnoreBlur = ignore => {
    this.ignoreBlur = ignore;
  };

  renderError = error => (
    <MenuRow>
      <Spacing horizontal={0.5}>
        {renderElementOrFunction(this.props.renderError, error) || (
          <ErrorMessage error={error} inline />
        )}
      </Spacing>
    </MenuRow>
  );

  renderItem = (item, highlighted = false, selected = false, props) => {
    const { disabled, href } = item;
    const { isItemSelectable } = this.props;
    const value = this.props.getItemValue(item);

    return (
      <div key={`item-${value}-${uuid()}`} {...props}>
        <MenuItem
          disabled={disabled || !isItemSelectable(item, selected)}
          highlighted={highlighted}
          href={href}
        >
          {this.props.renderItem(item, highlighted, selected)}
        </MenuItem>
      </div>
    );
  };

  renderItems = () => {
    return this.getFilteredItems(this.state).map((item, index) => {
      const value = this.props.getItemValue(item);
      const selected = this.props.isItemSelected
        ? this.props.isItemSelected(item, value)
        : value === this.state.value;
      const props = {};

      if (this.props.isItemSelectable(item, selected)) {
        props.onMouseDown = event => this.handleItemMouseDown(item, event);
        props.onMouseEnter = () => this.handleItemMouseEnter(index);
      }

      return this.renderItem(
        item,
        this.state.highlightedIndex === index,
        selected,
        props
      );
    });
  };

  renderLoading = () => (
    <MenuRow>
      <Spacing horizontal={1}>
        {renderElementOrFunction(this.props.renderLoading) || <Loader inline />}
      </Spacing>
    </MenuRow>
  );

  renderMenu = () => {
    const { accessibilityLabel, maxHeight } = this.props;
    const { error, loading, value } = this.state;
    const items = this.renderItems();

    if (!loading && !value && items.length === 0) {
      return <div />;
    }

    let content = null;

    if (error) {
      content = this.renderError(error);
    } else if (loading) {
      content = this.renderLoading();
    } else if (items.length === 0) {
      content = this.renderNoResults();
    }

    return (
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 10
        }}
        onTouchStart={() => this.setIgnoreBlur(true)}
        onMouseEnter={() => this.setIgnoreBlur(true)}
        onMouseLeave={() => this.setIgnoreBlur(false)}
      >
        <Menu accessibilityLabel={accessibilityLabel} maxHeight={maxHeight}>
          {content || items}
        </Menu>
      </div>
    );
  };

  renderNoResults = () => (
    <MenuRow>
      <Spacing horizontal={1}>
        {renderElementOrFunction(this.props.renderNoResults) || (
          <Text>{this.props.noResultsText || "No results found"}</Text>
        )}
      </Spacing>
    </MenuRow>
  );

  render() {
    const { id, open, value } = this.state;
    const { children, fieldProps, inputProps } = partitionFieldProps(
      this.props
    );

    return (
      <FormField {...fieldProps} id={id}>
        <div style={{ display: "block", position: "relative" }}>
          <BaseInput
            {...this.getInputProps(inputProps)}
            role="combobox"
            type="search"
            aria-autocomplete="list"
            aria-expanded={open}
            autoComplete="off"
            onBlur={this.handleInputBlur}
            onChange={this.handleInputChange}
            onClick={this.handleInputClick}
            onFocus={this.handleInputFocus}
            onKeyDown={this.handleInputKeyDown}
            propagateRef={this.inputRef}
            value={value}
          />

          {open && this.renderMenu()}
        </div>

        {children}
      </FormField>
    );
  }
}

Autocomplete.propTypes = {
  accessibilityLabel: _pt.string.isRequired,
  autoFocus: _pt.bool,
  children: _pt.node,
  clearOnSelect: _pt.bool,
  debounce: _pt.number,
  disableCache: _pt.bool,
  getItemValue: _pt.func,
  isItemSelectable: _pt.func,
  isItemSelected: _pt.func,
  loadItemsOnFocus: _pt.bool,
  loadItemsOnMount: _pt.bool,
  maxHeight: _pt.number,
  noResultsText: _pt.node,
  onChange: _pt.func.isRequired,
  onLoadItems: _pt.func.isRequired,
  onMenuVisibilityChange: _pt.func,
  onSelectItem: _pt.func,
  placeholder: _pt.string,
  renderError: _pt.any,
  renderItem: _pt.func,
  renderLoading: _pt.any,
  renderNoResults: _pt.any,
  shouldItemRender: _pt.func
};

Autocomplete.defaultProps = {
  autoFocus: false,
  clearOnSelect: false,
  debounce: 250,
  disableCache: false,
  getItemValue,
  isItemSelectable() {
    return true;
  },
  isItemSelected() {},
  loadItemsOnFocus: false,
  loadItemsOnMount: false,
  onMenuVisibilityChange() {},
  onSelectItem() {},
  renderItem
};
