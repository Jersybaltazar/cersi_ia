import React from 'react';
import { Spinner } from '../spinner';

// El parámetro `loadingProps` es el que espera `next/dynamic`
const SpinnerWrapper = (loadingProps: any) => {
  // Puedes pasar props si es necesario, como `noPadding`, por ejemplo:
  return <Spinner noPadding={false} />;
};

export default SpinnerWrapper;
