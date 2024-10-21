import { cx } from '@emotion/css';

function NationFlag({
  nation,
  size = 30,
  className = '',
}: {
  nation: 'thailand' | 'japan';
  size?: number;
  className?: string;
}) {
  const urls = {
    thailand:
      'https://cdn.countryflags.com/thumbs/thailand/flag-square-500.png',
    japan: 'https://cdn.countryflags.com/thumbs/japan/flag-square-500.png',
  };

  return (
    <img
      src={urls[nation]}
      width={size}
      height={size}
      className={cx('rounded-md', className)}
    />
  );
}

export default NationFlag;
