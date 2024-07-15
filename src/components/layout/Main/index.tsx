import Alert from '@components/base/Alert';
import { Outlet } from 'react-router-dom';
import useController from './controller';

function MainLayout() {
  const { outletContext, isShowAlert, alertProps } = useController();
  return (
    <>
      <div className="flex min-h-screen w-screen">
        <div className="flex w-full flex-1 flex-col">
          <Outlet context={outletContext} />
        </div>
      </div>
      {isShowAlert && (
        <div className="fixed left-0 top-0 z-50 w-full">
          <Alert {...alertProps} />
        </div>
      )}
    </>
  );
}

export default MainLayout;
