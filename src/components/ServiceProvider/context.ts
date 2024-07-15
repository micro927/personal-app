import type { ServiceType } from '@utils/service';
import { createContext } from 'react';

export const ServiceContext = createContext({} as ServiceType);
