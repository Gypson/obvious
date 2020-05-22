import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import LogoLoader from '../LogoLoader';
import Title from '../Title';
import Text from '../Text';

const styleSheet = ({ unit }) => ({
  appLoader: {
    padding: unit * 10,
  },

  appLoader_centered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtitle: {
    marginTop: unit,
  },

  errorOrLoader: {
    marginTop: unit * 1.5,
    maxWidth: '65%',
  },
});

const AppLoader = ({
  centered,
  children,
  error,
  errorTitle,
  failureText,
  fetched,
  loadingText,
  logo,
  small,
  subtitle,
}) => {
  const [styles, cx] = useStyles(styleSheet);

  if (fetched && !error) {
    return <main>{children}</main>;
  }

  return (
    <div className={cx(styles.appLoader, centered && styles.appLoader_centered)}>
      <Title level={small ? 3 : 1}>{error ? failureText : loadingText}</Title>

      {subtitle && (
        <div className={cx(styles.subtitle)}>
          <Text large={!small}>{subtitle}</Text>
        </div>
      )}

      <div className={cx(styles.errorOrLoader)}>
        {error ? (
          <ErrorMessage error={error} title={errorTitle} />
        ) : logo ? (
          <LogoLoader inline />
        ) : (
          <Loader inline />
        )}
      </div>
    </div>
  );
};

AppLoader.propTypes = {
  centered: _pt.bool,
  children: _pt.any.isRequired,
  error: _pt.oneOfType([_pt.any, _pt.oneOf([null])]),
  errorTitle: _pt.node,
  failureText: _pt.any.isRequired,
  fetched: _pt.bool,
  loadingText: _pt.any.isRequired,
  logo: _pt.bool,
  small: _pt.bool,
  subtitle: _pt.node,
};

AppLoader.defaultProps = {
  centered: false,
  error: null,
  errorTitle: null,
  fetched: null,
  logo: false,
  small: false,
  subtitle: null,
};

export default AppLoader;
