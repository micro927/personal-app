import Dropdown from '@components/base/Dropdown';
import LoadingTableRows from '@components/base/LoadingTableRows';
import { POSITION } from '@constants/position';
import { SIZE } from '@constants/size';
import type { CoupleDebtFormValues, CoupleDebt } from '@utils/service';
import { Fragment } from 'react';
import { TbMenu2 } from 'react-icons/tb';
import useController from './controller';
import AddExpenseButton from '@components/expense/AddExpenseButton';
import ExpenseFormModal from '@components/expense/ExpenseForm';

function NoteMenu({
  coupleDebtList,
  isMainLoading,
  onDataUpdate,
}: {
  coupleDebtList: CoupleDebt[];
  isMainLoading: boolean;
  onDataUpdate: () => void;
}) {
  const {
    coupleDebtListGroupedByPaidAt,
    submitCoupleDebtExpense,
    formModalRef,
    isOpenFormModal,
    closeFormModal,
    openAddFormModal,
    openEditFormModal,
    currentEditData,
    deleteCoupleDebt,
  } = useController({ onDataUpdate, coupleDebtList });

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden px-2 pb-32">
      <div className="px-2 pb-2">
        <p className="text-sm font-semibold">All expense note</p>
      </div>
      <table className="table table-pin-rows table-sm">
        <thead className="text-xs">
          <tr className="text-left opacity-30">
            <th className="w-1/5">Payer</th>
            <th className="w-fit">Title</th>
            <th className="w-1/5">Amount</th>
            <th className="w-1/5">Action</th>
          </tr>
        </thead>
        {isMainLoading ? (
          <LoadingTableRows colNo={4} rowNo={4} />
        ) : (
          coupleDebtListGroupedByPaidAt.map(({ date, data }, key) => {
            return (
              <Fragment key={key}>
                <thead>
                  <tr>
                    <td colSpan={4} className="rounded-btn bg-base-200">
                      <span className="!text-opacity-60">{date}</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {data.map(({ id, users, title, amount, paid_at }, rowKey) => {
                    const editValues: CoupleDebtFormValues = {
                      id,
                      user_id: users?.id ?? 0,
                      title,
                      amount,
                      paid_at,
                    };
                    return (
                      <Fragment key={rowKey}>
                        <tr>
                          <td className="w-1/5">
                            <div className="badge badge-accent badge-sm">
                              {users?.username}
                            </div>
                          </td>
                          <td className="w-full max-w-[110px] truncate">
                            {title}
                          </td>
                          <td className="w-1/5 text-right">
                            {amount.toLocaleString()}
                          </td>
                          <td className="w-1/5">
                            <Dropdown
                              id={`couple-debt-${id}-${key}-action`}
                              size={SIZE.SMALL}
                              position={POSITION.BOTTOM_LEFT}
                              buttonContent={() => <TbMenu2 />}
                              menuList={[
                                {
                                  content: 'Edit',
                                  onclick: () => openEditFormModal(editValues),
                                },
                                {
                                  content: 'Delete',
                                  onclick: () => deleteCoupleDebt(id),
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </Fragment>
            );
          })
        )}
      </table>
      <ExpenseFormModal
        formModalRef={formModalRef}
        closeFormModal={closeFormModal}
        isOpenFormModal={isOpenFormModal}
        submitFunction={submitCoupleDebtExpense}
        editData={currentEditData}
      />
      <AddExpenseButton
        isOpenFormModal={isOpenFormModal}
        openFormModal={openAddFormModal}
      />
    </div>
  );
}

export default NoteMenu;
