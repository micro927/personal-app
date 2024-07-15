import { BUTTON_SHAPE } from '@constants/button';
import { COLOR_NAME } from '@constants/colorName';
import { SIZE } from '@constants/size';
import { cx } from '@emotion/css';
import {
  buttonColorMapper,
  buttonIconSizeMapper,
  buttonSizeMapper,
} from '@utils/uiClassMapper';
import type { IconType } from 'react-icons';

function Button(
  props: JSX.IntrinsicElements['button'] & {
    size?: SIZE;
    shape?: BUTTON_SHAPE;
    color?: COLOR_NAME;
    outline?: boolean;
    link?: boolean;
    icon?: IconType;
    iconSize?: number;
    iconEnd?: boolean;
    iconClassName?: string;
    isLoading?: boolean;
  }
) {
  const size = props?.size ?? SIZE.MEDIUM;
  const color = props?.color ? buttonColorMapper[props.color] : '';
  const outline = props?.outline ? 'btn-outline' : '';
  const link = props?.link ? 'btn-link' : '';
  const shape = props?.shape ?? false;
  const Icon = props?.icon ? props.icon : () => <></>;
  const iconSize = props?.iconSize ?? buttonIconSizeMapper[size];
  const isLoading = props?.isLoading ?? false;

  return (
    <button
      className={cx(
        `btn flex flex-nowrap items-center justify-center gap-2`,
        buttonSizeMapper[size],
        color,
        outline,
        link,
        shape === BUTTON_SHAPE.SQUARE && 'btn-square',
        shape === BUTTON_SHAPE.CIRCLE && 'btn-circle',
        props.className
      )}
      type={props?.type}
      onClick={props.onClick}
      disabled={props.disabled || props.isLoading}
      tabIndex={props?.tabIndex}
    >
      {isLoading ? (
        <span className="loading loading-spinner" />
      ) : (
        <>
          {props.iconEnd ? (
            <>
              {props.children}
              <Icon size={iconSize} className={props.iconClassName} />
            </>
          ) : (
            <>
              <Icon size={iconSize} className={props.iconClassName} />
              {props.children}
            </>
          )}
        </>
      )}
    </button>
  );
}

export default Button;
