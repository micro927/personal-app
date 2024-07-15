import type { USER } from '@constants/microApp';

export type CoupleDebtSplitted = {
  coupleDebtId: number;
  title: string;
  [USER.FIRST]: UserAmountWithPayer;
  [USER.SECOND]: UserAmountWithPayer;
  paid_at: string;
};

export type UserAmountWithPayer = {
  amount: number;
  isPayer: boolean;
};
