import React from 'react';
import _pt from 'prop-types';
import componentName from '../../prop-types/componentName';
import Loadable from '../Loadable';

export default class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      error: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    const { onCatch, name } = this.props;
    onCatch(error, {
      ...errorInfo,
      name: name,
      boundary: true,
    });

    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (!error) {
      return children;
    }

    // NOTE: This component is generally not hit in production so we'll code split to keep some code
    // out of bundles in the optimistic case.
    return (
      <Loadable
        component={
          /* istanbul ignore next */ () =>
            import(/* webpackChunkName: "error-boundary-tripped" */ './private/Tripped')
        }
      />
    );
  }
}

ErrorBoundary.propTypes = {
  onCatch: _pt.any.isRequired,
  children: _pt.any.isRequired,
  name: componentName,
};

ErrorBoundary.defaultProps = {
  name: 'UnknownBoundary',
};
