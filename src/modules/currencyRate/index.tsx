import Button from '@components/base/Button';
import NationFlag from '@components/NationFlag';
import { SIZE } from '@constants/size';
import { TbMinus, TbPlus } from 'react-icons/tb';
import useController from './controller';
import { COLOR_NAME } from '@constants/colorName';

function CurrencyRate() {
  const {
    currency,
    register,
    onClickGo,
    items,
    onClickUp,
    onClickDown,
    onClickAddItem,
    onClickDeleteItem,
    jpySummaryDisplay,
  } = useController();
  return (
    <div className="flex h-full w-full flex-col gap-6 p-2">
      <div className="fixed left-0 top-0 z-30 w-full bg-base-100">
        <div className="w-full p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">Rate: {currency}</p>
            <div className="flex gap-3">
              <div className="flex gap-1">
                <Button
                  size={SIZE.SMALL}
                  onClick={onClickDown}
                  icon={TbMinus}
                />
                <Button size={SIZE.SMALL} onClick={onClickUp} icon={TbPlus} />
              </div>
              {/* <Button
                size={SIZE.SMALL}
                onClick={onClickSyncCurrency}
                disabled={isLoading}
              >
                Sync
              </Button> */}
            </div>
          </div>
          <div className="py-3">
            <div className="py-3">
              <label className="label label-text-alt text-success">
                {jpySummaryDisplay}
              </label>
            </div>
            <label htmlFor="title" className="label label-text-alt">
              THB Summary
            </label>
            <div className="relative">
              <NationFlag
                nation="thailand"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40 z-40"
              />
              <input
                type="text"
                className="input input-md input-bordered w-full"
                {...register('thb')}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <form
        name="currencyForm"
        noValidate
        className="flex w-full flex-col justify-center pt-[170px]"
      >
        <div className="px-2">
          <label htmlFor="title" className="label label-text-alt block">
            JPY list
          </label>
          <div className="flex flex-col gap-2">
            {items.map((_, index) => {
              return (
                <div key={index} className="relative">
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40 z-40">
                    {index === 0 ? (
                      <NationFlag nation="japan" />
                    ) : (
                      <Button
                        type="button"
                        size={SIZE.EXTRA_SMALL}
                        icon={TbMinus}
                        onClick={() => onClickDeleteItem(index)}
                      />
                    )}
                  </div>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="input input-md input-bordered w-full"
                    {...register(`jpy.${index}`)}
                    autoFocus
                    autoComplete="off"
                    onKeyDown={onClickGo}
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-fit place-self-end pt-4">
            <Button
              type="button"
              color={COLOR_NAME.INFO}
              onClick={onClickAddItem}
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CurrencyRate;
