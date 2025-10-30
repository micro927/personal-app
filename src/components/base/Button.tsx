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
  const {
    isLoading = false,
    size = SIZE.MEDIUM,
    shape = false,
    icon: Icon = () => <></>,
    iconSize = buttonIconSizeMapper[size],
    color: colorName,
    outline: hasOutline,
    link: hasLink,
    ...defaultProps
  } = props;

  const color = colorName ? buttonColorMapper[colorName] : '';
  const outline = hasOutline ? 'btn-outline' : '';
  const link = hasLink ? 'btn-link' : '';

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
      disabled={props.disabled || props.isLoading}
      {...defaultProps}
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
