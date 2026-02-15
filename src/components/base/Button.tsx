import type { ClickOrTouchHandler, Timeout } from '#types/utils';
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

  const continuosIntervalRef = useRef<Timeout | null>();

  const continuosProps = useMemo(() => {
    const action = defaultProps.onClick as (
      e: React.SyntheticEvent<HTMLButtonElement>
    ) => void;
    if (continuos && action) {
      const onTouchStart: ClickOrTouchHandler<HTMLButtonElement> = (e) => {
        action(e);

        continuosIntervalRef.current = setTimeout(() => {
          continuosIntervalRef.current = setInterval(() => {
            action(e);
          }, BUTTON_TIMEOUT.CONTINUOUS_INTERVAL);
        }, BUTTON_TIMEOUT.CONTINUOUS_TRIGGER);
      };

      const onTouchEnd: ClickOrTouchHandler<HTMLButtonElement> = () => {
        if (continuosIntervalRef.current) {
          clearInterval(continuosIntervalRef.current);
        }
        continuosIntervalRef.current = null;
      };

      return {
        onTouchStart,
        onTouchEnd,
        // onMouseDown: onTouchStart,
        // onMouseUp: onTouchEnd,
        onMouseLeave: onTouchEnd,
        onClick: undefined,
        style: {
          WebkitTouchCallout:
            'none' as React.CSSProperties['WebkitTouchCallout'],
          WebkitUserSelect: 'none' as React.CSSProperties['WebkitUserSelect'],
          userSelect: 'none' as React.CSSProperties['userSelect'],
          touchAction: 'manipulation',
        },
      };
    } else {
      return {};
    }
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
