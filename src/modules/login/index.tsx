import Button from '@components/base/Button';
import { COLOR_NAME } from '@constants/colorName';
import { FiAlertCircle, FiLock } from 'react-icons/fi';
import useController from './controller';

function Login() {
  const { formState, isLoading, onSubmit, register } = useController();
  const { isValid, errors } = formState;
  return (
    <div className="flex h-full -translate-y-32 items-center justify-center p-5">
      <form name="loginForm" noValidate onSubmit={onSubmit}>
        <div className="card w-full max-w-xl items-center bg-base-200 text-base-content shadow-lg">
          <div className="card-body flex w-full flex-col gap-5">
            <div className="card-title">Login</div>
            <label className="input input-bordered flex w-full items-center gap-2">
              <FiLock />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register('username')}
              />
            </label>
            {!isValid && errors.root?.message && (
              <div className="label-text-alt flex items-center gap-1 text-error">
                <FiAlertCircle />
                {errors.root?.message}
              </div>
            )}
            <div className="card-actions">
              <Button
                form="loginForm"
                type="submit"
                isLoading={isLoading}
                disabled={!isValid}
                color={COLOR_NAME.PRIMARY}
                className="w-full"
              >
                <FiLock />
                Log in
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
