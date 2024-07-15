import type { MicroAppObject } from '#types/microApp';
import { TbClipboardList } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function AppLinkCard({ appObject }: { appObject: MicroAppObject }) {
  const { title, route, description } = appObject;
  return (
    <Link
      to={route}
      className="card w-full bg-base-300 text-base-content shadow-sm"
    >
      <div className="card-body p-5">
        <div className="flex items-center justify-between gap-5 overflow-hidden">
          <div>
            <div className="flex items-center justify-center rounded-box bg-secondary p-4 text-secondary-content shadow-lg">
              <TbClipboardList size={24} />
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col gap-1">
            <h2 className="card-title truncate">{title}</h2>
            <hr className="border-base-content opacity-20" />
            <p className="line-clamp-2 text-sm">{description}</p>
          </div>
          {/* <div className="card-actions justify-end">
            <Button onClick={() => navigate(route)}>Enter</Button>
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export default AppLinkCard;
