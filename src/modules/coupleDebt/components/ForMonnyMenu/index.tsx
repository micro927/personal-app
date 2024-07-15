import LoadingTableRows from '@components/base/LoadingTableRows';
import { Fragment } from 'react/jsx-runtime';
import useController from './controller';
import Dropdown from '@components/base/Dropdown';
import { COLOR_NAME } from '@constants/colorName';
import { POSITION } from '@constants/position';
import { cx } from '@emotion/css';
import type { ExpenseType } from '@utils/service';

function ForMonnyMenu({ expenseType }: { expenseType: ExpenseType[] }) {
  const {
    isLoading,
    individualExpenseListGroupedByPaidAt,
    updateExpenseType,
    getExpenseTypeTitleAndColor,
  } = useController();

  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-hidden pb-12">
      <div id="for-monny-table-section" className="px-2">
        <div className="px-2 pb-2">
          <p className="text-sm font-semibold">For Monny</p>
        </div>

        <table className="table table-pin-rows table-sm">
          <thead className="text-xs">
            <tr className="text-left opacity-30">
              <th className="w-fit max-w-[130px]">Title</th>
              <th className="w-1/4 text-center">Type</th>
              <th className="w-1/6">Amount</th>
            </tr>
          </thead>
          {isLoading ? (
            <LoadingTableRows colNo={4} rowNo={4} />
          ) : (
            individualExpenseListGroupedByPaidAt.map(({ date, data }, key) => {
              return (
                <Fragment key={key}>
                  <thead>
                    <tr className="w-fit">
                      <td colSpan={4} className="rounded-btn bg-base-200">
                        <span className="!text-opacity-60">{date}</span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(
                      ({ id, title, amount, _expense_type: type }, rowKey) => {
                        const { title: typeTitle, colorClass } =
                          getExpenseTypeTitleAndColor(type?.title);
                        return (
                          <Fragment key={rowKey}>
                            <tr>
                              <td className="w-fit max-w-[130px]">{title}</td>
                              <td className="1/4 text-center">
                                <Dropdown
                                  id={`expense-${id}-${key}-type`}
                                  position={POSITION.BOTTOM_LEFT}
                                  buttonContent={() => (
                                    <div
                                      className={cx(
                                        'badge badge-sm w-full',
                                        typeTitle === 'None'
                                          ? 'badge-accent badge-outline text-nowrap'
                                          : colorClass
                                      )}
                                    >
                                      {typeTitle}
                                    </div>
                                  )}
                                  color={COLOR_NAME.GHOST}
                                  menuList={expenseType.map(
                                    ({ id: expenseTypeId, title }) => {
                                      const { title: fullTitle, colorClass } =
                                        getExpenseTypeTitleAndColor(title);
                                      return {
                                        content: (
                                          <div
                                            className={cx(
                                              'badge badge-sm text-nowrap',
                                              type?.id === expenseTypeId
                                                ? 'badge-ghost'
                                                : colorClass
                                            )}
                                          >
                                            {fullTitle}
                                          </div>
                                        ),
                                        onclick: () =>
                                          updateExpenseType(id, expenseTypeId),
                                      };
                                    }
                                  )}
                                  menuClassName="!w-fit"
                                />
                              </td>
                              <td className="w-1/6">
                                {amount.toLocaleString()}
                              </td>
                            </tr>
                          </Fragment>
                        );
                      }
                    )}
                  </tbody>
                </Fragment>
              );
            })
          )}
        </table>
      </div>
    </div>
  );
}

export default ForMonnyMenu;
