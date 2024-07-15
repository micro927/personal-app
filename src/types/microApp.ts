import type { ROUTE } from '@constants/route';

type MicroAppRoute = Exclude<ROUTE, ROUTE.HOME>;

export type MicroAppObject = {
  title: string;
  shortTitle: string;
  description: string;
  route: MicroAppRoute;
};
