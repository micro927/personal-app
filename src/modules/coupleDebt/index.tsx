import AppWithUserLayout from '@components/layout/AppWithUser';
import MenuTab from './components/ViewTab';
import useController from './controller';
import NoteMenu from './components/NoteMenu';
import SplitMenu from './components/SplitMenu';
import { COUPLE_DEBT_MENU_KEY } from '@constants/microApp';
import ForMonnyMenu from './components/ForMonnyMenu';

function CoupleDebt() {
  const {
    isLoading,
    menuList,
    activeTab,
    onClickTab,
    coupleDebtList,
    updateCoupleDebtListSilently,
    expenseType,
  } = useController();

  return (
    <AppWithUserLayout>
      <div className="flex h-full w-full flex-col gap-6">
        <div className="px-2">
          <MenuTab
            menuList={menuList}
            onClickTab={onClickTab}
            activeTab={activeTab}
          />
        </div>
        {activeTab === COUPLE_DEBT_MENU_KEY.NOTE && (
          <NoteMenu
            coupleDebtList={coupleDebtList}
            isMainLoading={isLoading}
            onDataUpdate={updateCoupleDebtListSilently}
          />
        )}
        {activeTab === COUPLE_DEBT_MENU_KEY.SPLIT && (
          <SplitMenu
            coupleDebtList={coupleDebtList}
            isMainLoading={isLoading}
            onDataUpdate={updateCoupleDebtListSilently}
          />
        )}
        {activeTab === COUPLE_DEBT_MENU_KEY.FOR_MONNY && (
          <ForMonnyMenu expenseType={expenseType} />
        )}
      </div>
    </AppWithUserLayout>
  );
}

export default CoupleDebt;
