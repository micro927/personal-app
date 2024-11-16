import { ServiceContext } from '@components/ServiceProvider/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCurrencyFormat } from '@utils/data';
import { useLocalStorageItem } from '@utils/useLocalStorageItem';
import { sum } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LOCAL_STORAGE_CUSTOM_CURRENCY = 'custom-currency';

const fromValuesSchema = z.object({
  thb: z.string().optional(),
  jpy: z.array(z.string()),
});

type FormSchema = z.infer<typeof fromValuesSchema>;

function useController() {
  const {
    get: getCustomCurrencyFromLocalStorage,
    set: setCustomCurrencyToLocalStorage,
  } = useLocalStorageItem<{ jpy: string; items: string[] }>(
    LOCAL_STORAGE_CUSTOM_CURRENCY
  );

  const { currencyService } = useContext(ServiceContext);
  const [currency, setCurrency] = useState<string>(
    getCustomCurrencyFromLocalStorage()?.jpy ?? '0'
  );
  const [items, setItems] = useState(
    getCustomCurrencyFromLocalStorage()?.items ?? ['']
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    setValue,
    reset: resetForm,
  } = useForm<FormSchema>({
    mode: 'onChange',
    defaultValues: {
      jpy: getCustomCurrencyFromLocalStorage()?.items ?? [''],
    },
    resolver: zodResolver(fromValuesSchema),
  });

  const jpyWatchValues = watch('jpy');

  const jpySummary = sum(
    (jpyWatchValues ?? []).map((val) => (val ? parseFloat(val) : 0))
  );

  const jpySummaryDisplay = `${jpySummary.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })} ¥`;

  const thbSummary = jpySummary * (parseFloat(currency) / 100);

  useEffect(() => {
    setValue(
      'thb',
      thbSummary.toLocaleString('en-US', { maximumFractionDigits: 0 })
    );
    setItems(watch('jpy') ?? ['']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thbSummary]);

  useEffect(() => {
    setCustomCurrencyToLocalStorage({ jpy: currency, items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, thbSummary]);

  const onClickSyncCurrency = () => {
    setIsLoading(true);
    currencyService
      .getThaiBahtJapaneseYenRate()
      .then((res) => {
        const currencyFormatted = parseCurrencyFormat(res);
        setCurrency(currencyFormatted);
      })
      .finally(() => setIsLoading(false));
  };

  const onClickUp = () =>
    setCurrency((prev) => parseCurrencyFormat(parseFloat(prev) + 0.01));

  const onClickDown = () =>
    setCurrency((prev) => parseCurrencyFormat(parseFloat(prev) - 0.01));

  const onClickAddItem = () => {
    const newItems = [...watch('jpy'), ''];
    setValue('jpy', newItems);
    setItems(newItems);
  };

  const onClickDeleteItem = (index: number) => {
    const newItems = items.filter((_, thisIndex) => thisIndex != index);
    setValue('jpy', newItems);
    setItems(newItems);
  };

  const onClickGo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickAddItem();
      event.preventDefault();
    }
  };

  return {
    isLoading,
    onClickSyncCurrency,
    currency,
    watch,
    register,
    resetForm,
    thbSummary,
    jpySummaryDisplay,
    items,
    onClickUp,
    onClickDown,
    onClickAddItem,
    onClickDeleteItem,
    onClickGo,
  };
}

export default useController;
