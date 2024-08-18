import type { DropdownMenu } from '#types/component';
import { COLOR_NAME } from '@constants/colorName';
import type { POSITION } from '@constants/position';
import { SIZE } from '@constants/size';
import { cx } from '@emotion/css';
import {
  buttonColorMapper,
  buttonSizeMapper,
  dropdownMenuPositionMapper,
  dropdownMenuSizeMapper,
} from '@utils/uiClassMapper';
import { useOutsideClick } from '@utils/useOutsideClick';
function Dropdown({
  id,
  buttonContent,
  position,
  color,
  size,
  className = '',
  menuList,
  menuClassName = '',
}: {
  id: string;
  buttonContent: string | (() => JSX.Element);
  menuList: DropdownMenu[];
  position?: POSITION;
  size?: SIZE;
  color?: COLOR_NAME;
  className?: string;
  menuClassName?: string;
}) {
  const closeMenu = () => document.getElementById(id)?.removeAttribute('open');

  const { elementRef } = useOutsideClick<HTMLDetailsElement>(closeMenu);

  const ButtonChildren =
    typeof buttonContent === 'string'
      ? () => <span>{buttonContent}</span>
      : buttonContent;

  return (
    <details
      ref={elementRef}
      id={id}
      className={cx(
        'dropdown',
        position ? dropdownMenuPositionMapper[position] : ''
      )}
    >
      <summary
        className={cx(
          'btn m-1',
          size ? buttonSizeMapper[size] : '',
          color ? buttonColorMapper[color] : '',
          className
        )}
      >
        <ButtonChildren />
      </summary>
      <ul
        className={cx(
          'menu dropdown-content menu-sm z-30 w-52 rounded-box bg-base-200 p-2 shadow-lg',
          size ? dropdownMenuSizeMapper[size] : '',
          menuClassName
        )}
      >
        {menuList.map(({ content, onclick }, key) => {
          return (
            <li key={`${id}-li-${key}`}>
              <div
                onClick={() => {
                  document.getElementById(id)?.removeAttribute('open');
                  onclick?.();
                }}
              >
                {content}
              </div>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export default Dropdown;
