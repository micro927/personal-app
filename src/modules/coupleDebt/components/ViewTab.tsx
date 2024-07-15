import type { COUPLE_DEBT_MENU_KEY } from '@constants/microApp';
import { cx } from '@emotion/css';

export type Menu = { key: COUPLE_DEBT_MENU_KEY; title: string };

function MenuTab({
  menuList,
  onClickTab,
  activeTab,
}: {
  menuList: Menu[];
  onClickTab: (key: COUPLE_DEBT_MENU_KEY) => void;
  activeTab: COUPLE_DEBT_MENU_KEY;
}) {
  return (
    <div role="tablist" className="tabs-boxed tabs shadow">
      {menuList.map(({ title, key }) => {
        return (
          <a
            key={key}
            role="tab"
            className={cx('tab', activeTab === key && 'tab-active')}
            onClick={() => onClickTab(key)}
          >
            {title}
          </a>
        );
      })}
    </div>
  );
}

export default MenuTab;
