import { AuthContext } from '@components/AuthProvider/context';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UserFormValues } from '@services';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function useController() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    username: z.string().min(1),
  });
  const defaultValues: UserFormValues = {
    username: '',
  };
  const { register, handleSubmit, setError, formState } =
    useForm<UserFormValues>({
      mode: 'onChange',
      defaultValues,
      resolver: zodResolver(schema),
    });

  const onSubmit = handleSubmit((values: UserFormValues) => {
    setIsLoading(true);
    login(values)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError('root', {
          type: 'validate',
          message: 'Login failed, please try again.',
        });
      });
  });

  return { isLoading, register, onSubmit, formState };
}

export default useController;
