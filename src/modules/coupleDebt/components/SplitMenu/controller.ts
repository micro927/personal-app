import { MainLayoutOutletContext } from '#types/component';
import type { CoupleDebtSplitted } from '#types/data';
import { ServiceContext } from '@components/ServiceProvider/context';
import { USER } from '@constants/microApp';
import {
  injectSplittedList,
  shiftAmount,
  splitCoupleDebtList,
  summaryCoupleDebtList,
  transformCoupleDebtSplittedListToIndividualExpenseList,
} from '@utils/data';
import { getScreenShot } from '@utils/screenShot';
import type { CoupleDebt } from '@services';
import { useLocalStorageItem } from '@utils/useLocalStorageItem';
import { useModal } from '@utils/useModal';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const LOCAL_STORAGE_SPLITTED_LIST = 'splitted-list';

function useController({
  coupleDebtList,
  onDataUpdate,
}: {
  coupleDebtList: CoupleDebt[];
  onDataUpdate?: () => void;
}) {
  const {
    get: getSplittedListFromLocalStorage,
    set: setSplittedListToLocalStorage,
    remove: clearSplittedListLocalStorage,
  } = useLocalStorageItem<CoupleDebtSplitted[]>(LOCAL_STORAGE_SPLITTED_LIST);

  const [isLoading, setIsLoading] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { coupleDebtService, individualExpenseService } =
    useContext(ServiceContext);
  const { showAlert } = useOutletContext<MainLayoutOutletContext>();
  const [coupleDebtSplittedList, setCoupleDebtSplittedList] = useState(
    splitCoupleDebtList(coupleDebtList)
  );
  const [isShowSummary, setIsShowSummary] = useState(false);

  const {
    modalRef: confirmModalRef,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
    isOpenModal: isOpenConfirmModal,
  } = useModal();

  const updateCoupleDebtSplitted = (
    coupleDebtId: number,
    amountPair: [number, number]
  ) => {
    setCoupleDebtSplittedList((coupleDebtSplittedList) => {
      return coupleDebtSplittedList.map((coupleDebtSplitted) => {
        if (coupleDebtSplitted.coupleDebtId !== coupleDebtId)
          return coupleDebtSplitted;
        return {
          ...coupleDebtSplitted,
          [USER.FIRST]: {
            ...coupleDebtSplitted[USER.FIRST],
            amount: amountPair[0],
          },
          [USER.SECOND]: {
            ...coupleDebtSplitted[USER.SECOND],
            amount: amountPair[1],
          },
        };
      });
    });
  };

  const increaseFirstAmount = useCallback(
    (coupleDebtId: number, amountPair: [number, number]) => {
      const newAmountPair = shiftAmount(amountPair, USER.FIRST, 5);
      updateCoupleDebtSplitted(coupleDebtId, newAmountPair);
    },
    []
  );

  const increaseSecondAmount = useCallback(
    (coupleDebtId: number, amountPair: [number, number]) => {
      const newAmountPair = shiftAmount(amountPair, USER.SECOND, 5);
      updateCoupleDebtSplitted(coupleDebtId, newAmountPair);
    },
    []
  );

  const summary = useMemo(
    () => summaryCoupleDebtList(coupleDebtSplittedList),
    [coupleDebtSplittedList]
  );

  const showSummary = () => setIsShowSummary(true);
  const hideSummary = () => setIsShowSummary(false);

  const completeCoupleDebtList = (
    coupleDebtSplittedList: CoupleDebtSplitted[]
  ) => {
    setIsLoading(true);
    const completedIdList = coupleDebtSplittedList.map(
      (coupleDebtSplitted) => coupleDebtSplitted.coupleDebtId
    );
    coupleDebtService
      .putUpdateCompleteDebt(completedIdList)
      .then(() => {
        individualExpenseService
          .postInsertManyExpense(
            transformCoupleDebtSplittedListToIndividualExpenseList(
              coupleDebtSplittedList
            )
          )
          .then(() => {
            onDataUpdate?.();
            setCoupleDebtSplittedList([]);
            showAlert({ text: 'All debts are Clear Completely!' });
            setIsLoading(false);
            clearSplittedListLocalStorage();
            closeConfirmModal();
          })
          .catch((err) => {
            setIsLoading(false);
            throw err;
          });
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };

  const saveToLocalStorage = () => {
    setSplittedListToLocalStorage(coupleDebtSplittedList);
  };

  const loadFromLocalStorage = () => {
    setCoupleDebtSplittedList((currentList) => {
      return injectSplittedList(currentList, getSplittedListFromLocalStorage());
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const takeScreenShot = () => {
    if (screenRef.current && avatarRef.current)
      getScreenShot({
        screenElement: screenRef.current,
        ignoreElements: [avatarRef.current],
        filename: 'couple-debt',
      });
  };

  return {
    coupleDebtSplittedList,
    increaseFirstAmount,
    increaseSecondAmount,
    summary,
    isShowSummary,
    showSummary,
    hideSummary,
    completeCoupleDebtList,
    screenRef,
    takeScreenShot,
    avatarRef,
    isLoading,
    confirmModalRef,
    openConfirmModal,
    closeConfirmModal,
    isOpenConfirmModal,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}

export default useController;
