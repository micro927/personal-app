import { MainLayoutOutletContext } from '#types/component';
import { ServiceContext } from '@components/ServiceProvider/context';
import { COLOR_NAME } from '@constants/colorName';
import { groupCoupleDebtListByPaidAt } from '@utils/data';
import type { CoupleDebt, CoupleDebtFormValues } from '@services';
import { useModal } from '@utils/useModal';
import { useContext, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function useController({
  onDataUpdate,
  coupleDebtList,
}: {
  onDataUpdate: () => void;
  coupleDebtList: CoupleDebt[];
}) {
  const { coupleDebtService } = useContext(ServiceContext);
  const { showAlert } = useOutletContext<MainLayoutOutletContext>();
  const [currentEditData, setCurrentEditData] =
    useState<CoupleDebtFormValues>();
  const {
    modalRef: formModalRef,
    openModal: openFormModal,
    closeModal: closeFormModal,
    isOpenModal: isOpenFormModal,
  } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const coupleDebtListGroupedByPaidAt =
    groupCoupleDebtListByPaidAt(coupleDebtList);

  const submitCoupleDebtExpense = async (values: CoupleDebtFormValues) => {
    return coupleDebtService.postUpsertDebt(values).then(({ error }) => {
      if (!error) {
        onDataUpdate();
        showAlert({ text: 'Completed!', timeout: 1000 });
      } else {
        throw error.message;
      }
    });
  };

  const deleteCoupleDebt = async (id: number) => {
    setIsLoading(true);
    coupleDebtService
      .deleteDebt(id)
      .then(({ error }) => {
        if (!error) {
          onDataUpdate();
          showAlert({
            text: 'Deleted!',
            typeColor: COLOR_NAME.INFO,
            timeout: 1000,
          });
        } else {
          throw error.message;
        }
      })
      .finally(() => setIsLoading(false));
  };

  const openEditFormModal = (formValues: CoupleDebtFormValues) => {
    setCurrentEditData(formValues);
    openFormModal();
  };

  const openAddFormModal = () => {
    setCurrentEditData(undefined);
    openFormModal();
  };

  return {
    isLoading,
    coupleDebtListGroupedByPaidAt,
    submitCoupleDebtExpense,
    formModalRef,
    openAddFormModal,
    closeFormModal,
    isOpenFormModal,
    currentEditData,
    openEditFormModal,
    deleteCoupleDebt,
  };
}

export default useController;
