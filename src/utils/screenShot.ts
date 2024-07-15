import { format } from 'date-fns';
import html2canvas from 'html2canvas-pro';

type GetScreenShotOptions = {
  screenElement: HTMLElement;
  ignoreElements?: Element[];
  filename: string;
};

export const getScreenShot = ({
  screenElement,
  ignoreElements = [],
  filename,
}: GetScreenShotOptions) => {
  html2canvas(screenElement, {
    ignoreElements: (element) => ignoreElements.includes(element),
  }).then((canvas) => {
    const base64image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = base64image;
    link.download = `${filename}-${format(new Date(), 'd-M-y ')}`;
    link.click();
  });
};
