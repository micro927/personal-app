import Button from '@components/base/Button';
import TopRoundedContentBox from '@components/base/TopRoundedContentBox';
import { BUTTON_SHAPE } from '@constants/button';
import { COLOR_NAME } from '@constants/colorName';

import { ROUTE } from '@constants/route';
import { type ReactNode } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function AppWithMiniBackLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col bg-primary">
      <div className="flex items-center justify-between bg-primary px-1  text-primary-content">
        <Button
          shape={BUTTON_SHAPE.SQUARE}
          icon={FiChevronLeft}
          iconSize={18}
          onClick={() => navigate(ROUTE.HOME)}
          color={COLOR_NAME.GHOST}
        />
      </div>
      <TopRoundedContentBox>{children}</TopRoundedContentBox>
    </div>
  );
}

export default AppWithMiniBackLayout;
