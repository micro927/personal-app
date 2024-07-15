import type { COLOR_NAME } from '@constants/colorName';
import type { User, UserFormValues } from '@utils/service';

export type AlertTypeColor =
  | COLOR_NAME.INFO
  | COLOR_NAME.SUCCESS
  | COLOR_NAME.WARNING
  | COLOR_NAME.ERROR;

export type AlertProps = {
  typeColor?: AlertTypeColor;
  text: string;
};

export type DropdownMenu = {
  content: string | JSX.Element;
  onclick?: () => void;
};

export type MainLayoutOutletContext = {
  showAlert: (options: AlertProps & { timeout?: number }) => void;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  login: (values: UserFormValues) => Promise<void>;
  logout: () => void;
  user: User;
};
