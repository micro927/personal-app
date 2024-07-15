import { AuthContext } from '@components/AuthProvider/context';
import { ServiceContext } from '@components/ServiceProvider/context';
import { groupIndividualExpenseListByPaidAt } from '@utils/data';
import { IndividualExpense } from '@utils/service';
import { snakeToTitleCase } from '@utils/snakeToTitleCase';
import { useContext, useEffect, useMemo, useState } from 'react';

function useController() {
  const { individualExpenseService } = useContext(ServiceContext);
  const { user } = useContext(AuthContext);

  const [individualExpenseList, setIndividualExpenseList] = useState<
    IndividualExpense[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isIncludePersonalExpense, setIsIncludePersonalExpense] =
    useState(false);

  const getIndividualExpense = (silent = false) => {
    !silent && setIsLoading(true);
    individualExpenseService
      .getExpense(user.id)
      .then(({ data }) => {
        if (data) setIndividualExpenseList(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const individualExpenseListGroupedByPaidAt = useMemo(() => {
    const dataList = isIncludePersonalExpense
      ? individualExpenseList
      : individualExpenseList.filter(
          ({ is_from_couple_debt }) => is_from_couple_debt
        );
    return groupIndividualExpenseListByPaidAt(dataList);
  }, [isIncludePersonalExpense, individualExpenseList]);

  const toggleIsIncludeButton = () =>
    setIsIncludePersonalExpense((prev) => !prev);

  const updateExpenseType = (expenseId: number, expenseTypeId: number) =>
    individualExpenseService
      .putUpdateExpenseType(expenseId, expenseTypeId)
      .then(() => {
        getIndividualExpense(true);
      });

  const getExpenseTypeTitleAndColor = (expenseType: string | undefined) => {
    const colorClass =
      expenseType === 'special' || expenseType === 'shopping'
        ? 'badge-secondary'
        : expenseType === 'note_only'
        ? 'badge-primary'
        : 'badge-accent';

    return {
      title: snakeToTitleCase(expenseType ?? 'none'),
      colorClass,
    };
  };

  useEffect(() => {
    getIndividualExpense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    individualExpenseListGroupedByPaidAt,
    isIncludePersonalExpense,
    toggleIsIncludeButton,
    updateExpenseType,
    getExpenseTypeTitleAndColor,
  };
}

export default useController;
