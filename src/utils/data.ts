import type { CoupleDebtSplitted } from '#types/data';
import { USER, userDatabaseId } from '@constants/microApp';
import { format, getDate } from 'date-fns';
import type {
  IndividualExpense,
  CoupleDebt,
  IndividualExpenseFormValues,
} from '../services';

const groupDataByPaidAt = <DataType extends { paid_at: string }>(
  dataList: DataType[]
): {
  date: string;
  data: DataType[];
}[] => {
  const resultList: {
    date: string;
    data: DataType[];
  }[] = [];

  dataList.reduce((previousPaidAt, current) => {
    if (getDate(previousPaidAt) === getDate(current.paid_at)) {
      resultList[resultList.length - 1].data.push(current);
    } else {
      resultList.push({
        date: format(current.paid_at, '(eeeeee) d MMM yy '),
        data: [current],
      });
    }

    return current.paid_at;
  }, '');
  return resultList;
};

export const groupCoupleDebtListByPaidAt = groupDataByPaidAt<CoupleDebt>;

export const groupIndividualExpenseListByPaidAt =
  groupDataByPaidAt<IndividualExpense>;

export const splitCoupleDebtList = (
  coupleDebtList: CoupleDebt[]
): CoupleDebtSplitted[] => {
  return coupleDebtList.map(
    ({ id: coupleDebtId, title, amount, users, paid_at }) => {
      const firstAmount = Math.ceil(amount / 2);
      const secondAmount = amount - firstAmount;

      return {
        coupleDebtId,
        title,
        paid_at,
        [USER.FIRST]: {
          amount: firstAmount,
          isPayer: users?.username === USER.FIRST,
        },
        [USER.SECOND]: {
          amount: secondAmount,
          isPayer: users?.username === USER.SECOND,
        },
      };
    }
  );
};

export const transformCoupleDebtSplittedListToIndividualExpenseList = (
  coupleDebtSplittedList: CoupleDebtSplitted[]
): IndividualExpenseFormValues[] => {
  return coupleDebtSplittedList
    .map((coupleDebtSplitted) => {
      const firstUser = coupleDebtSplitted[USER.FIRST];
      const secondUser = coupleDebtSplitted[USER.SECOND];
      const { title, paid_at } = coupleDebtSplitted;

      return [
        {
          user_id: userDatabaseId[USER.FIRST],
          title,
          type_id: null,
          amount: firstUser.amount,
          paid_at,
          is_from_couple_debt: true,
        },
        {
          user_id: userDatabaseId[USER.SECOND],
          title,
          type_id: null,
          amount: secondUser.amount,
          paid_at,
          is_from_couple_debt: true,
        },
      ];
    })
    .flat();
};

export const shiftAmount = (
  amountPair: [number, number],
  to: USER,
  n: number
): [number, number] => {
  const isFirstGiveToSecond = to === USER.SECOND;
  const takenIndex = isFirstGiveToSecond ? 1 : 0;
  const givenIndex = isFirstGiveToSecond ? 0 : 1;
  const sumAmount = amountPair[0] + amountPair[1];
  const takenNewAmount = Math.min(amountPair[takenIndex] + n, sumAmount);
  const givenNewAmount = Math.max(amountPair[givenIndex] - n, 0);
  return isFirstGiveToSecond
    ? [givenNewAmount, takenNewAmount]
    : [takenNewAmount, givenNewAmount];
};

export const summaryCoupleDebtList = (
  coupleDebtSplittedList: CoupleDebtSplitted[]
) => {
  const result = {
    expense: {
      totalItem: coupleDebtSplittedList.length,
      totalPaid: 0,
      firstPaid: 0,
      firstExpense: 0,
      secondPaid: 0,
      secondExpense: 0,
    },
    debt: {
      given: USER.FIRST,
      taken: USER.SECOND,
      amount: 0,
    },
  };

  const { expense, debt } = result;
  for (const coupleDebtSplitted of coupleDebtSplittedList) {
    const firstUser = coupleDebtSplitted[USER.FIRST];
    const secondUser = coupleDebtSplitted[USER.SECOND];
    const sumAmount = firstUser.amount + secondUser.amount;

    if (firstUser.isPayer) {
      expense.firstPaid += sumAmount;
    } else {
      expense.secondPaid += sumAmount;
    }

    expense.firstExpense += firstUser.amount;
    expense.secondExpense += secondUser.amount;
    expense.totalPaid += sumAmount;
  }

  const firstUserRequestAmount = expense.firstPaid - expense.firstExpense;
  const secondUserRequestAmount = expense.secondPaid - expense.secondExpense;

  if (firstUserRequestAmount > secondUserRequestAmount) {
    debt.given = USER.SECOND;
    debt.taken = USER.FIRST;
    debt.amount = firstUserRequestAmount;
  } else {
    debt.given = USER.FIRST;
    debt.taken = USER.SECOND;
    debt.amount = secondUserRequestAmount;
  }

  return result;
};

export const injectSplittedList = (
  currentList: CoupleDebtSplitted[],
  anotherList: CoupleDebtSplitted[] | null
) => {
  if (anotherList === null) return currentList;

  const idWithIndexInAnotherList: Record<number, number> = {};
  anotherList.map(({ coupleDebtId }, index) => {
    idWithIndexInAnotherList[coupleDebtId] = index;
  });

  return currentList.map((currentItem) => {
    const thisItemIndexInAnotherList =
      idWithIndexInAnotherList?.[currentItem.coupleDebtId];

    if (typeof thisItemIndexInAnotherList === 'number') {
      return anotherList[thisItemIndexInAnotherList];
    }
    return currentItem;
  });
};
