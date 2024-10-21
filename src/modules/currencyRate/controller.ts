import { ServiceContext } from '@components/ServiceProvider/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorageItem } from '@utils/useLocalStorageItem';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { sum } from 'lodash';

const LOCAL_STORAGE_CUSTOM_CURRENCY = 'custom-currency';

const fromValuesSchema = z.object({
  jpy: z.string().optional(),
  thb: z.array(z.string().optional()),
});

type FormSchema = z.infer<typeof fromValuesSchema>;

function useController() {
  const {
    get: getCustomCurrencyFromLocalStorage,
    set: setCustomCurrencyToLocalStorage,
  } = useLocalStorageItem<{ jpy: string }>(LOCAL_STORAGE_CUSTOM_CURRENCY);

  const { currencyService } = useContext(ServiceContext);
  const [currency, setCurrency] = useState<string>(
    getCustomCurrencyFromLocalStorage()?.jpy ?? '2'
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

  const jpySummary = sum(watch('thb')) * (parseFloat(currency) / 100);

  useEffect(() => {
    setValue('jpy', jpySummary.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jpySummary]);

  const onClickSyncCurrency = () => {
    setIsLoading(true);
    currencyService
      .getThaiBahtJapaneseYenRate()
      .then((res) => {
        setCurrency(res);
        setCustomCurrencyToLocalStorage({ jpy: res });
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    onClickSyncCurrency,
    currency,
    watch,
    register,
    resetForm,
    jpySummary,
  };
}

export default useController;
