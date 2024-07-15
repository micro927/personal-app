import type { AlertProps, MainLayoutOutletContext } from '#types/component';
import { COLOR_NAME } from '@constants/colorName';
import { useState } from 'react';

function useController() {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertProps>({ text: '' });

  const showAlert = ({
    text,
    typeColor = COLOR_NAME.SUCCESS,
    timeout = 3000,
  }: AlertProps & { timeout?: number }) => {
    setAlertProps({ text, typeColor });
    setIsShowAlert(true);

    setTimeout(() => {
      setIsShowAlert(false);
    }, timeout);
  };

  const outletContext: MainLayoutOutletContext = {
    showAlert,
  };

  return { outletContext, isShowAlert, alertProps };
}

export default useController;
