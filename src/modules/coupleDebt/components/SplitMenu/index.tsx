import type { CoupleDebt } from '@services';
import useController from './controller';
import LoadingTableRows from '@components/base/LoadingTableRows';
import { cx } from '@emotion/css';
import {
  TbArrowBadgeLeft,
  TbArrowBadgeRight,
  TbArrowBadgeRightFilled,
  TbBowlChopsticks,
  TbCamera,
  TbCash,
  TbChevronDown,
  TbChevronUp,
  TbCircleCheck,
  TbDownload,
  TbFileUpload,
} from 'react-icons/tb';
import Button from '@components/base/Button';
import { BUTTON_SHAPE } from '@constants/button';
import { SIZE } from '@constants/size';
import { USER, userAvatar } from '@constants/microApp';
import { COLOR_NAME } from '@constants/colorName';
import Modal from '@components/base/Modal';

function SplitMenu({
  coupleDebtList,
  isMainLoading,
  onDataUpdate,
}: {
  coupleDebtList: CoupleDebt[];
  isMainLoading: boolean;
  onDataUpdate?: () => void;
}) {
  const {
    isLoading,
    coupleDebtSplittedList,
    increaseFirstAmount,
    increaseSecondAmount,
    summary,
    isShowSummary,
    showSummary,
    hideSummary,
    screenRef,
    takeScreenShot,
    avatarRef,
    completeCoupleDebtList,
    confirmModalRef,
    openConfirmModal,
    closeConfirmModal,
    saveToLocalStorage,
    loadFromLocalStorage,
  } = useController({ coupleDebtList, onDataUpdate });
  return (
    <>
      <div
        ref={screenRef}
        className="flex h-full w-full flex-col gap-8 overflow-hidden pb-12"
      >
        <div id="split-table-section" className="px-1">
          <div className="px-3 pb-2">
            <p className="text-sm font-semibold">Split expense</p>
          </div>
          <div className="pb-5">
            <table className="table table-pin-rows">
              <thead className="text-xs">
                <tr className="text-left opacity-80">
                  <th className="w-full max-w-[110px]"></th>
                  <th className="w-1/6 text-secondary first-letter:uppercase">
                    {USER.FIRST}
                  </th>
                  <th className="w-1/6 text-accent first-letter:uppercase">
                    {USER.SECOND}
                  </th>
                  <th className="w-full text-center">Increase (+5)</th>
                </tr>
              </thead>
              {isMainLoading ? (
                <LoadingTableRows colNo={4} rowNo={4} />
              ) : (
                <tbody>
                  {coupleDebtSplittedList.map((coupleDebtSplitted, key) => {
                    const { coupleDebtId, title } = coupleDebtSplitted;
                    const firstUser = coupleDebtSplitted[USER.FIRST];
                    const secondUser = coupleDebtSplitted[USER.SECOND];
                    return (
                      <tr key={key}>
                        <td className="w-full max-w-[110px] truncate">
                          {title}
                        </td>
                        <td
                          className={cx(
                            firstUser.isPayer && 'font-bold',
                            'w-1/6'
                          )}
                        >
                          {firstUser.amount.toLocaleString()}
                        </td>
                        <td
                          className={cx(
                            secondUser.isPayer && 'font-bold',
                            'w-1/6'
                          )}
                        >
                          {secondUser.amount.toLocaleString()}
                        </td>
                        <td className="flex w-full justify-end gap-3">
                          <Button
                            icon={TbArrowBadgeLeft}
                            iconSize={18}
                            size={SIZE.SMALL}
                            color={COLOR_NAME.SECONDARY}
                            shape={BUTTON_SHAPE.SQUARE}
                            className="shadow-xl"
                            onClick={() =>
                              increaseFirstAmount(coupleDebtId, [
                                firstUser.amount,
                                secondUser.amount,
                              ])
                            }
                          />
                          <Button
                            icon={TbArrowBadgeRight}
                            iconSize={18}
                            size={SIZE.SMALL}
                            color={COLOR_NAME.ACCENT}
                            shape={BUTTON_SHAPE.SQUARE}
                            className="shadow-xl"
                            onClick={() =>
                              increaseSecondAmount(coupleDebtId, [
                                firstUser.amount,
                                secondUser.amount,
                              ])
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
            <hr className="w-full border-base-200" />
          </div>
        </div>
        {isShowSummary && (
          <div
            id="summary-stat-section"
            className="animate-translateYAndFadeIn px-2"
          >
            <div className="px-2 pb-4">
              <div className="select-none text-sm font-semibold">Summary</div>
            </div>
            <div className="flex w-full flex-col gap-3 rounded-box bg-base-200 p-5">
              <label className="label label-text-alt">Action</label>
              <div className="stats w-full shadow">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <TbCash size={18} />
                  </div>
                  <div className="stat-title first-letter:uppercase">
                    {USER.FIRST}
                  </div>
                  <div className="stat-value text-2xl text-secondary">
                    {summary.expense.firstExpense.toLocaleString()}
                  </div>
                  <div className="stat-desc">
                    {summary.expense.firstPaid.toLocaleString()}฿ Paid
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-accent">
                    <TbCash size={18} />
                  </div>
                  <div className="stat-title first-letter:uppercase">
                    {USER.SECOND}
                  </div>
                  <div className="stat-value text-2xl text-accent">
                    {summary.expense.secondExpense.toLocaleString()}
                  </div>
                  <div className="stat-desc">
                    {summary.expense.secondPaid.toLocaleString()}฿ Paid
                  </div>
                </div>
              </div>
              <div className="stats w-full shadow">
                <div className="stat">
                  <div className="stat-figure">
                    <div
                      ref={avatarRef}
                      className="avatar-group h-fit w-fit -space-x-7"
                    >
                      <div className="avatar">
                        <div className="z-20 w-10 rounded-full shadow-sm">
                          <img src={userAvatar[summary.debt.given]} />
                        </div>
                      </div>
                      <div className="avatar">
                        <div className="z-10 w-10 rounded-full shadow-sm">
                          <img src={userAvatar[summary.debt.taken]} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stat-value">
                    <span className="text-info">
                      {summary.debt.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="stat-title">
                    <div className="flex flex-row items-center gap-2 font-bold uppercase">
                      <p>{summary.debt.given}</p>
                      <TbArrowBadgeRightFilled
                        size={18}
                        className="animate-pulse"
                      />
                      <p>{summary.debt.taken}</p>
                    </div>
                  </div>
                </div>
              </div>
              <label className="label label-text-alt">Total</label>
              <div className="stats w-full overflow-hidden shadow">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <TbCash size={18} />
                  </div>
                  <div className="stat-title">Total Paid</div>
                  <div className="stat-value text-primary">
                    {summary.expense.totalPaid.toLocaleString()}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <TbBowlChopsticks size={18} />
                  </div>
                  <div className="stat-title">Total Item</div>
                  <div className="stat-value text-primary">
                    {summary.expense.totalItem.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isShowSummary ? (
          <div className="grid w-full grid-cols-2 gap-3 px-2">
            <div>
              <Button
                icon={TbCamera}
                className="w-full"
                onClick={takeScreenShot}
                iconSize={18}
                tabIndex={0}
              >
                Take Screenshot
              </Button>
            </div>
            <div>
              <Button
                icon={TbChevronUp}
                className="w-full"
                onClick={hideSummary}
                iconEnd
                iconSize={18}
                tabIndex={0}
              >
                Hide Summary
              </Button>
            </div>

            <div className="col-span-2">
              <Button
                color={COLOR_NAME.PRIMARY}
                icon={TbCircleCheck}
                className="w-full"
                iconSize={18}
                isLoading={isLoading}
                onClick={openConfirmModal}
              >
                Mark as Completed
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 px-2">
            <div className="flex gap-3 self-start">
              <Button
                icon={TbFileUpload}
                onClick={saveToLocalStorage}
                iconSize={18}
              />

              <Button
                icon={TbDownload}
                onClick={loadFromLocalStorage}
                iconSize={18}
              />
            </div>
            <div className="ml-auto">
              <Button
                color={COLOR_NAME.PRIMARY}
                icon={TbChevronDown}
                onClick={showSummary}
                iconEnd
                iconSize={18}
              >
                Show Summary
              </Button>
            </div>
          </div>
        )}
      </div>
      <Modal
        modalRef={confirmModalRef}
        modalId="confirm-split-modal"
        closeModal={closeConfirmModal}
      >
        <div className="pb-12">
          <h3 className="text-lg font-bold">Are you confirm?</h3>
        </div>
        <div className="flex justify-between gap-6">
          <div>
            <Button
              size={SIZE.MEDIUM}
              className="w-full"
              onClick={closeConfirmModal}
            >
              Close
            </Button>
          </div>
          <div>
            <Button
              color={COLOR_NAME.PRIMARY}
              icon={TbCircleCheck}
              className="w-full"
              iconSize={18}
              isLoading={isLoading}
              onClick={() => completeCoupleDebtList(coupleDebtSplittedList)}
            >
              Mark as Completed
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SplitMenu;
