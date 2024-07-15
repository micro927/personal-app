import type { AlertProps } from '#types/component';
import { COLOR_NAME } from '@constants/colorName';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

function Alert({ typeColor = COLOR_NAME.ERROR, text }: AlertProps) {
  const Icon = typeColor === COLOR_NAME.SUCCESS ? FiCheckCircle : FiAlertCircle;
  return (
    <div
      role="alert"
      className={`alert alert-error flex animate-translateYAndFadeIn gap-3 py-5 text-sm shadow-lg`}
    >
      <Icon size={24} />
      <span>{text}</span>
    </div>
  );
}

export default Alert;
