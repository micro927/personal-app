import AppWithUserLayout from '@components/layout/AppWithUser';
// import MenuTab from '@modules/coupleDebt/components/ViewTab';
import useController from './controller';
import Button from '@components/base/Button';
import { SIZE } from '@constants/size';
import NationFlag from '@components/NationFlag';
import { TbMinus, TbPlus } from 'react-icons/tb';

function CurrencyRate() {
  const {
    isLoading,
    onClickSyncCurrency,
    currency,
    register,
    onClickUp,
    onClickDown,
  } = useController();
  return (
    <AppWithUserLayout>
      <div className="flex h-full w-full flex-col gap-6">
        <div className="px-2">
          <div className="flex items-center justify-between">
            <p className="text-sm">Rate: {parseFloat(currency).toFixed(3)}</p>
            <div className="flex gap-3">
              <div className="flex gap-1">
                <Button
                  size={SIZE.SMALL}
                  onClick={onClickDown}
                  icon={TbMinus}
                />
                <Button size={SIZE.SMALL} onClick={onClickUp} icon={TbPlus} />
              </div>
              <Button
                size={SIZE.SMALL}
                onClick={onClickSyncCurrency}
                disabled={isLoading}
              >
                Sync
              </Button>
            </div>
          </div>
          <form
            name="addExpenseForm"
            noValidate
            className="flex w-full flex-col justify-center"
          >
            <label htmlFor="title" className="label label-text-alt">
              THB Summary
            </label>
            <div className="relative">
              <NationFlag
                nation="thailand"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40"
              />
              <input
                type="number"
                className="input input-md input-bordered w-full"
                {...register('thb')}
                readOnly
              />
            </div>
            <label htmlFor="title" className="label label-text-alt">
              JPY list
            </label>
            <div className="relative">
              <NationFlag
                nation="japan"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40"
              />
              <input
                type="number"
                className="input input-md input-bordered w-full"
                {...register('jpy.0')}
                autoFocus
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      </div>
    </AppWithUserLayout>
  );
}

export default CurrencyRate;
