import { MicroAppObject } from '#types/microApp';
import { ROUTE } from './route';

export const microAppList: MicroAppObject[] = [
  {
    title: 'Couple Debt',
    shortTitle: 'Debt',
    description:
      'note expense, split with reasonable amount and give summary balance.',
    route: ROUTE.COUPLE_DEBT,
  },
  {
    title: 'Currency Rate',
    shortTitle: 'JPY',
    description: 'Real time Thai Baht - Japanese yen rate for travel!',
    route: ROUTE.CURRENCY_RATE,
  },
];

export enum USER {
  FIRST = 'micro',
  SECOND = 'bua',
}

export const userAvatar = {
  [USER.FIRST]: 'https://avatars.githubusercontent.com/micro927',
  [USER.SECOND]: 'https://avatars.githubusercontent.com/micro-gmail',
};

export const userDatabaseId = {
  [USER.FIRST]: 2,
  [USER.SECOND]: 3,
};

export enum COUPLE_DEBT_MENU_KEY {
  NOTE = 'note',
  SPLIT = 'split',
  FOR_MONNY = 'for-monny',
}

export const FIXED_JPY = '20.55';

export const SPLIT_SHIFT_AMOUNT_DEFAULT = 5;
export const SPLIT_SHIFT_AMOUNT_MAXIMUM = 500;
