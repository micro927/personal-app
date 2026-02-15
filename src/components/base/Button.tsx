import { BUTTON_SHAPE, BUTTON_TIMEOUT } from '@constants/button';
import { COLOR_NAME } from '@constants/colorName';
import { SIZE } from '@constants/size';
import { cx } from '@emotion/css';
import {
  buttonColorMapper,
  buttonIconSizeMapper,
  buttonSizeMapper,
} from '@utils/uiClassMapper';
import { useMemo, useRef } from 'react';
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
    continuos?: boolean;
  }
) {
  const {
    disabled = false,
    children,
    className,
    size = SIZE.MEDIUM,
    shape = false,
    color: colorName,
    outline: hasOutline,
    link: hasLink,
    icon: Icon = () => <></>,
    iconSize = buttonIconSizeMapper[size],
    iconEnd = false,
    iconClassName = '',
    isLoading = false,
    continuos = false,
    ...defaultProps
  } = props;

  const continuosIntervalRef = useRef<number | null>(null);
  const continuosDelayRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (continuosDelayRef.current !== null) {
      clearTimeout(continuosDelayRef.current);
    }

    if (continuosIntervalRef.current !== null) {
      clearInterval(continuosIntervalRef.current);
    }

    continuosDelayRef.current = null;
    continuosIntervalRef.current = null;
  };

  const continuosProps = useMemo(() => {
    const action = defaultProps.onClick;

    if (!continuos || !action) return {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fire = () => action(undefined as any);

    const start = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      action(e); // real click once

      continuosDelayRef.current = window.setTimeout(() => {
        continuosIntervalRef.current = window.setInterval(
          fire,
          BUTTON_TIMEOUT.CONTINUOUS_INTERVAL
        );
      }, BUTTON_TIMEOUT.CONTINUOUS_TRIGGER);
    };

    return {
      onPointerDown: start,
      onPointerUp: clearTimers,
      onPointerLeave: clearTimers,
      onPointerCancel: clearTimers,
      onContextMenu: clearTimers,
      onBlur: clearTimers,
      onClick: undefined,
    };
  }, [continuos, defaultProps.onClick]);

  const color = colorName ? buttonColorMapper[colorName] : '';
  const outline = hasOutline ? 'btn-outline' : '';
  const link = hasLink ? 'btn-link' : '';

  return (
    <button
      {...defaultProps}
      className={cx(
        `btn flex flex-nowrap items-center justify-center gap-2`,
        buttonSizeMapper[size],
        color,
        outline,
        link,
        shape === BUTTON_SHAPE.SQUARE && 'btn-square',
        shape === BUTTON_SHAPE.CIRCLE && 'btn-circle',
        className
      )}
      disabled={disabled || isLoading}
      {...continuosProps}
    >
      {isLoading ? (
        <span className="loading loading-spinner" />
      ) : (
        <>
          {iconEnd ? (
            <>
              {children}
              <Icon size={iconSize} className={iconClassName} />
            </>
          ) : (
            <>
              <Icon size={iconSize} className={iconClassName} />
              {children}
            </>
          )}
        </>
      )}
    </button>
  );
}

export default Button;
