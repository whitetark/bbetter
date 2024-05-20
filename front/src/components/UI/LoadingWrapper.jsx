import React from 'react';
import Loading from './Loading';

const LoadingWrapper = ({ children, isLoading }) => {
  return !isLoading ? <>{children}</> : <Loading />;
};

export default LoadingWrapper;
