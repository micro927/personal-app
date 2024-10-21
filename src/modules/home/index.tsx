import AppLinkCard from '@components/AppLinkCard';
import { AuthContext } from '@components/AuthProvider/context';
import Button from '@components/base/Button';
import AppWithUserLayout from '@components/layout/AppWithUser';
import { microAppList } from '@constants/microApp';
import { useContext } from 'react';

function Home() {
  const { user, logout } = useContext(AuthContext);
  return (
    <AppWithUserLayout>
      <div className="flex w-full flex-col gap-5 px-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">
            Welcome, <span className="uppercase">{user.username}</span>
          </div>
          <div>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {microAppList.map((microApp, index) => (
            <div key={index}>
              <AppLinkCard appObject={microApp} />
            </div>
          ))}
        </div>
      </div>
    </AppWithUserLayout>
  );
}

export default Home;
