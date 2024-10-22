import { ServiceContext } from '@components/ServiceProvider/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorageItem } from '@utils/useLocalStorageItem';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { sum } from 'lodash';

const LOCAL_STORAGE_CUSTOM_CURRENCY = 'custom-currency';

const fromValuesSchema = z.object({
  thb: z.string().optional(),
  jpy: z.array(z.string().optional()),
});

type FormSchema = z.infer<typeof fromValuesSchema>;

function useController() {
  const {
    get: getCustomCurrencyFromLocalStorage,
    set: setCustomCurrencyToLocalStorage,
  } = useLocalStorageItem<{ jpy: string }>(LOCAL_STORAGE_CUSTOM_CURRENCY);

  const { currencyService } = useContext(ServiceContext);
  const [currency, setCurrency] = useState<string>(
    getCustomCurrencyFromLocalStorage()?.jpy ?? '0'
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    setValue,
    reset: resetForm,
  } = useForm<FormSchema>({
    mode: 'onChange',
    resolver: zodResolver(fromValuesSchema),
  });

  const thbSummary = (sum(watch('jpy')) * (parseFloat(currency) / 100)).toFixed(
    0
  );

  useEffect(() => {
    setValue('thb', thbSummary.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thbSummary]);

  useEffect(() => {
    setCustomCurrencyToLocalStorage({ jpy: currency });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const onClickSyncCurrency = () => {
    setIsLoading(true);
    currencyService
      .getThaiBahtJapaneseYenRate()
      .then((res) => {
        const currencyWith3Digit = parseFloat(res).toFixed(3).toString();
        setCurrency(currencyWith3Digit);
      })
      .finally(() => setIsLoading(false));
  };

  const onClickUp = () =>
    setCurrency((prev) => (parseFloat(prev) + 0.001).toFixed(3).toString());

  const onClickDown = () =>
    setCurrency((prev) => (parseFloat(prev) - 0.001).toFixed(3).toString());

  return {
    isLoading,
    onClickSyncCurrency,
    currency,
    watch,
    register,
    resetForm,
    thbSummary,
    onClickUp,
    onClickDown,
  };
}

export default useController;
