import Button from '@components/base/Button';
import DatePickerInput from '@components/base/DatePickerInput';
import Modal from '@components/base/Modal';
import { COLOR_NAME } from '@constants/colorName';
import type { CoupleDebtFormValues } from '@services';
import type { RefObject } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { TbMessage2Plus } from 'react-icons/tb';
import useController from './controller';
import { USER, userDatabaseId } from '@constants/microApp';
import { cx } from '@emotion/css';

function ExpenseFormModal({
  formModalRef,
  isOpenFormModal,
  closeFormModal,
  submitFunction,
  editData,
}: {
  formModalRef: RefObject<HTMLDialogElement>;
  isOpenFormModal: boolean;
  closeFormModal: () => void;
  openFormModal?: () => void;
  submitFunction: (values: CoupleDebtFormValues) => Promise<void>;
  editData?: CoupleDebtFormValues;
}) {
  const {
    isLoading,
    onSubmit,
    register,
    formState,
    setPaidAt,
    setUserId,
    watch,
  } = useController({
    submitFunction,
    editData,
    isOpenFormModal,
    closeFormModal,
  });
  const { isValid, errors } = formState;
  const selectedUserId = watch().user_id;
  return (
    <Modal
      modalId="add-expense-modal"
      closeModal={closeFormModal}
      modalRef={formModalRef}
    >
      <form
        name="addExpenseForm"
        noValidate
        className="flex w-full flex-col justify-center"
        onSubmit={onSubmit}
      >
        <div className="mb-2 flex w-full flex-col gap-3">
          <div role="tablist" className="tabs-boxed tabs shadow">
            {Object.values(USER).map((user, key) => {
              const userId = userDatabaseId[user];
              return (
                <a
                  key={key}
                  role="tab"
                  className={cx(
                    'tab font-medium uppercase',
                    selectedUserId === userId &&
                      'tab-active !bg-secondary !text-secondary-content'
                  )}
                  onClick={() => setUserId(userId)}
                >
                  {user}
                </a>
              );
            })}
          </div>
          <label htmlFor="title" className="label label-text-alt">
            Title
          </label>
          <input
            type="text"
            className="input input-md input-bordered w-full"
            {...register('title')}
          />
          <label htmlFor="amount" className="label label-text-alt">
            Amount (฿)
          </label>
          <input
            type="number"
            className="input input-md input-bordered w-full"
            {...register('amount', { valueAsNumber: true })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
          />
          <label htmlFor="paid_at" className="label label-text-alt">
            Paid date
          </label>
          <DatePickerInput setValueFunction={setPaidAt} />
          <div className="label h-9">
            {!isValid && errors.root?.message && (
              <div className="label-text-alt flex items-center gap-1 text-error">
                <FiAlertCircle />
                {errors.root?.message}
              </div>
            )}
          </div>
        </div>
        <div className="modal-action justify-between">
          <Button onClick={closeFormModal} disabled={isLoading}>
            Close
          </Button>
          <Button
            disabled={!isValid}
            type="submit"
            isLoading={isLoading}
            color={editData ? COLOR_NAME.ACCENT : COLOR_NAME.SECONDARY}
            className="px-10"
          >
            <TbMessage2Plus /> {editData ? 'Edit' : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ExpenseFormModal;
