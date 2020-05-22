import React from 'react';
import _pt from 'prop-types';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import renderElementOrFunction from '../../utils/renderElementOrFunction';

//Can not refactor to hooks untill a catchError hook is created

export default class Loadable extends React.Component {
  constructor() {
    super(...arguments);

    const { delay } = this.props;

    this.state = {
      error: null,
      showLoading: delay <= 0,
    };

    this.renderComponent = () => {
      const {
        children,
        component,
        delay,
        error,
        loading,
        noError,
        noLoading,
        ...restProps
      } = this.props;
      const Component = React.lazy(component);

      if (typeof children === 'function') {
        return children(Component, restProps);
      }

      return <Component {...restProps}>{children}</Component>;
    };

    this.renderError = () => {
      const { error } = this.state;
      const { error: renderable, noError } = this.props;

      if (!error || noError) {
        return null;
      }

      return renderElementOrFunction(renderable, error) || <ErrorMessage error={error} />;
    };
  }

  static factory(component, initialProps = {}) {
    return function LoadableFactory(props) {
      return <Loadable {...initialProps} {...props} component={component} />;
    };
  }

  // istanbul ignore next
  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  componentDidMount() {
    const { delay } = this.props;

    if (delay && delay > 0) {
      window.setTimeout(() => {
        this.setState({
          showLoading: true,
        });
      }, delay);
    }
  }

  renderLoading() {
    const { loading, noLoading } = this.props;
    const { showLoading } = this.state;

    if (!showLoading || noLoading) {
      return null;
    }

    return renderElementOrFunction(loading) || <Loader static />;
  }

  render() {
    const { error } = this.state;
    if (error) {
      return this.renderError();
    }

    return (
      <React.Suspense fallback={this.renderLoading()}>{this.renderComponent()}</React.Suspense>
    );
  }
}

Loadable.propTypes = {
  children: _pt.oneOfType([_pt.node, _pt.func]),
  component: _pt.func.isRequired,
  delay: _pt.number,
  error: _pt.any,
  loading: _pt.any,
  noError: _pt.bool,
  noLoading: _pt.bool,
};

Loadable.defaultProps = {
  children: null,
  delay: 150,
  error: null,
  loading: null,
  noError: false,
  noLoading: false,
};
