import type { ServiceType } from '@services';
import { createContext } from 'react';

export const ServiceContext = createContext({} as ServiceType);
