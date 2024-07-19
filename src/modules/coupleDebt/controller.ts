import { useContext, useEffect, useState } from 'react';
import type { Menu } from './components/ViewTab';
import { ServiceContext } from '@components/ServiceProvider/context';
import { CoupleDebt, type ExpenseType } from '@services';
import { COUPLE_DEBT_MENU_KEY } from '@constants/microApp';
import { useUserActivity } from '@utils/useUserActivity';

const menuList: Menu[] = [
  {
    key: COUPLE_DEBT_MENU_KEY.NOTE,
    title: 'Note',
  },
  {
    key: COUPLE_DEBT_MENU_KEY.SPLIT,
    title: 'Split',
  },
  {
    key: COUPLE_DEBT_MENU_KEY.FOR_MONNY,
    title: 'For Monny',
  },
];

function useController() {
  const { coupleDebtService, constantTablesService } =
    useContext(ServiceContext);
  const { isActive } = useUserActivity();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<COUPLE_DEBT_MENU_KEY>(
    menuList[0].key
  );
  const [coupleDebtList, setCoupleDebtList] = useState<CoupleDebt[]>([]);
  const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);

  const getCoupleDebtList = (silentLoad: boolean = false) => {
    if (!silentLoad) setIsLoading(true);
    coupleDebtService.getDebt().then(({ data, error }) => {
      if (error) setCoupleDebtList([]);
      if (data) setCoupleDebtList(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    });
  };

  const getExpenseType = () => {
    constantTablesService.getExpenseType().then(({ data }) => {
      if (data) {
        setExpenseType(data);
      }
    });
  };

  const onClickTab = (tabKey: COUPLE_DEBT_MENU_KEY) => {
    setActiveTab(tabKey);
  };

  const updateCoupleDebtListSilently = () => {
    getCoupleDebtList(true);
  };

  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      getCoupleDebtList();
    }
    getExpenseType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isActive && import.meta.env.MODE === 'production') {
      updateCoupleDebtListSilently();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return {
    isLoading,
    menuList,
    activeTab,
    onClickTab,
    coupleDebtList,
    updateCoupleDebtListSilently,
    expenseType,
  };
}

export default useController;
