import type { User } from '@utils/service';
import { AuthContext } from '@components/AuthProvider/context';
import Button from '@components/base/Button';
import TopRoundedContentBox from '@components/base/TopRoundedContentBox';
import { BUTTON_SHAPE } from '@constants/button';
import { COLOR_NAME } from '@constants/colorName';
import { userAvatar, type USER } from '@constants/microApp';
import { ROUTE } from '@constants/route';
import { useContext, type ReactNode } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function AppWithUserLayout({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const { username } = user as User;
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col bg-primary pt-8">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-primary px-3 py-2 text-primary-content">
        <Button
          shape={BUTTON_SHAPE.SQUARE}
          icon={FiChevronLeft}
          iconSize={24}
          onClick={() => navigate(ROUTE.HOME)}
          color={COLOR_NAME.GHOST}
        />
        <div className="flex items-center gap-3">
          <p className="text-xl font-semibold">
            <span className="uppercase">{username}</span>
          </p>
          <div className="avatar">
            <div className="w-9 rounded-full shadow-sm">
              <img src={userAvatar[username as USER]} />
            </div>
          </div>
        </div>
      </div>
      <TopRoundedContentBox>{children}</TopRoundedContentBox>
    </div>
  );
}

export default AppWithUserLayout;
