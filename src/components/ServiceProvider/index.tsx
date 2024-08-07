import { service } from '@services';
import type { PropsWithChildren } from 'react';
import { ServiceContext } from './context';

const ServiceProvider = ({ children }: PropsWithChildren) => {
  return (
    <ServiceContext.Provider value={service()}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
