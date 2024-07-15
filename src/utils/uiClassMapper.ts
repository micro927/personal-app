import { COLOR_NAME } from '@constants/colorName';
import { POSITION } from '@constants/position';
import { SIZE } from '@constants/size';

export const buttonColorMapper = {
  [COLOR_NAME.ACCENT]: ` btn-accent`,
  [COLOR_NAME.BASE_100]: ` btn-base-100`,
  [COLOR_NAME.BASE_200]: ` btn-base-200`,
  [COLOR_NAME.BASE_300]: ` btn-base-300`,
  [COLOR_NAME.ERROR]: ` btn-error`,
  [COLOR_NAME.INFO]: ` btn-info`,
  [COLOR_NAME.NEUTRAL]: ` btn-neutral`,
  [COLOR_NAME.PRIMARY]: ` btn-primary`,
  [COLOR_NAME.SECONDARY]: ` btn-secondary`,
  [COLOR_NAME.SUCCESS]: ` btn-success`,
  [COLOR_NAME.WARNING]: ` btn-warning`,
  [COLOR_NAME.GHOST]: ` btn-ghost`,
};

export const buttonSizeMapper = {
  [SIZE.EXTRA_SMALL]: ` btn-xs`,
  [SIZE.SMALL]: ` btn-sm`,
  [SIZE.MEDIUM]: ` btn-md`,
  [SIZE.LARGE]: ` btn-lg`,
};

export const buttonIconSizeMapper = {
  [SIZE.EXTRA_SMALL]: 12,
  [SIZE.SMALL]: 14,
  [SIZE.MEDIUM]: 16,
  [SIZE.LARGE]: 18,
};

export const alertColorMapper = {
  [COLOR_NAME.ERROR]: ` alert-error text-error-content`,
  [COLOR_NAME.INFO]: ` alert-info text-info-content`,
  [COLOR_NAME.SUCCESS]: ` alert-success text-success-content`,
  [COLOR_NAME.WARNING]: ` alert-warning text-warning-content`,
};

export const dropdownMenuPositionMapper = {
  [POSITION.BOTTOM]: 'dropdown-bottom',
  [POSITION.BOTTOM_LEFT]: 'dropdown-bottom dropdown-end',
  [POSITION.BOTTOM_RIGHT]: 'dropdown-right dropdown-end',
  [POSITION.LEFT]: 'dropdown-left',
  [POSITION.RIGHT]: 'dropdown-right',
  [POSITION.TOP]: 'dropdown-top',
  [POSITION.TOP_LEFT]: 'dropdown-left dropdown-end',
  [POSITION.TOP_RIGHT]: 'dropdown-top dropdown-end',
};

export const dropdownMenuSizeMapper = {
  [SIZE.EXTRA_SMALL]: ` menu-xs`,
  [SIZE.SMALL]: ` menu-sm`,
  [SIZE.MEDIUM]: ` menu-md`,
  [SIZE.LARGE]: ` menu-lg`,
};
