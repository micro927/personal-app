import { AuthContext } from '@components/AuthProvider/context';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CoupleDebtFormValues } from '@services';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function useController({
  submitFunction,
  editData,
  isOpenFormModal,
  closeFormModal,
}: {
  submitFunction: (values: CoupleDebtFormValues) => Promise<void>;
  editData?: CoupleDebtFormValues;
  isOpenFormModal: boolean;
  closeFormModal: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const defaultValues: CoupleDebtFormValues = {
    user_id: user.id,
    title: '',
    amount: undefined,
    paid_at: new Date().toDateString(),
  };

  const fromValuesSchema = z.object({
    id: z.number().optional(),
    user_id: z.number().min(1),
    title: z.string().min(1),
    amount: z.number().min(1),
    paid_at: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState,
    setValue,
    watch,
    reset: resetForm,
  } = useForm<CoupleDebtFormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(fromValuesSchema),
  });

  const setPaidAt = (paidAt: Date) => {
    setValue('paid_at', paidAt.toDateString());
  };

  const setUserId = (id: number) => {
    setValue('user_id', id);
  };

  const onSubmit = handleSubmit((formData: CoupleDebtFormValues) => {
    setIsLoading(true);
    submitFunction(formData)
      .then(() => {
        setIsLoading(false);
        closeFormModal();
      })
      .catch(() => {
        setIsLoading(false);
        setError('root', {
          type: '',
          message: 'Submit error!',
        });
      });
  });

  useEffect(() => {
    if (editData) {
      resetForm(editData);
    } else {
      resetForm(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  useEffect(() => {
    if (!isOpenFormModal) resetForm(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenFormModal]);

  return {
    isLoading,
    onSubmit,
    formState,
    register,
    setPaidAt,
    setUserId,
    watch,
  };
}

export default useController;
