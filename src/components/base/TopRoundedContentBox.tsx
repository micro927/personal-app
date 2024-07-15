import type { ReactNode } from 'react';

function TopRoundedContentBox({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full rounded-t-box bg-base-100 pt-9">
      {children}
    </div>
  );
}

export default TopRoundedContentBox;
