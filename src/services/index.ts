import type { QueryData } from '@supabase/supabase-js';
import supabase from '../utils/supabase';

export const service = () => {
  const users = () => supabase.from('users');
  const coupleDebt = () => supabase.from('couple-debt');
  const individualExpense = () => supabase.from('individual-expense');
  const _expenseType = () => supabase.from('_expense_type');

  const usersService = {
    getUserByUsername: async (username: string) => {
      return await users().select('id, username').eq('username', username);
    },
  };

  const coupleDebtService = {
    getDebt: async () => {
      return await coupleDebt()
        .select(`id,title,amount, paid_at, users ( id, username )`)
        .is('completed', false)
        .order('paid_at,id');
    },
    getDebtByUser: async (userId: number) => {
      return await coupleDebt()
        .select(`id,title,amount, paid_at, users ( id, username )`)
        .eq('user_id', userId)
        .is('completed', false)
        .order('paid_at,id');
    },
    postUpsertDebt: async (values: CoupleDebtFormValues) => {
      return await coupleDebt().upsert([values]);
    },
    deleteDebt: async (id: number) => {
      return await coupleDebt().delete().eq('id', id);
    },
    putUpdateCompleteDebt: async (completedIdList: number[]) => {
      return await coupleDebt()
        .update({ completed: true })
        .in('id', completedIdList);
    },
  };

  const individualExpenseService = {
    getExpense: async (userId: number) => {
      return await individualExpense()
        .select('*, users ( id, username ), _expense_type ( id, title )')
        .eq('user_id', userId)
        .order('paid_at,id');
    },
    postInsertManyExpense: async (
      valuesArray: IndividualExpenseFormValues[]
    ) => {
      return await individualExpense().insert(valuesArray);
    },
    putUpdateExpenseType: async (expenseId: number, expenseTypeId: number) => {
      return await individualExpense()
        .update({ type_id: expenseTypeId })
        .eq('id', expenseId);
    },
  };

  const constantTablesService = {
    getExpenseType: async () => {
      return await _expenseType().select('*');
    },
  };

  return {
    usersService,
    coupleDebtService,
    individualExpenseService,
    constantTablesService,
  };
};

export type ServiceType = ReturnType<typeof service>;

export type User = QueryData<
  ReturnType<ServiceType['usersService']['getUserByUsername']>
>[number];
// NOTE: copy from supabase insert function values

export type UserFormValues = {
  username: string;
};

export type CoupleDebt = QueryData<
  ReturnType<ServiceType['coupleDebtService']['getDebt']>
>[number];

// NOTE: copy from supabase insert function values
export type CoupleDebtFormValues = {
  id?: number | undefined;
  user_id: number;
  title?: string | undefined;
  amount?: number | undefined;
  paid_at: string;
  completed?: boolean | undefined;
};

export type IndividualExpense = QueryData<
  ReturnType<ServiceType['individualExpenseService']['getExpense']>
>[number];

// NOTE: copy from supabase insert function values
export type IndividualExpenseFormValues = {
  amount: number;
  id?: number | undefined;
  is_from_couple_debt?: boolean | undefined;
  is_noted?: boolean | undefined;
  paid_at: string;
  title?: string | undefined;
  type_id?: number | null | undefined;
  user_id: number;
};

export type ExpenseType = QueryData<
  ReturnType<ServiceType['constantTablesService']['getExpenseType']>
>[number];
