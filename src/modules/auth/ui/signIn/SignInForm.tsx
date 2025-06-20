import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { AuthByEmailModel } from '@/modules/auth/models/auth';
import { useSignInStore } from '@/modules/auth/stores/signInStore';

export const SignInForm: FC = observer(() => {
  const store = useSignInStore();

  const router = useRouter();

  useEffect(() => {
    const dispose = reaction(
      () => store.isFormSubmitSuccess,
      (isSuccess: boolean) => {
        if (isSuccess) {
          router.push('/sign-up');
        }
      },
    );
    return () => dispose();
  }, [router]);

  return (
    <Form<AuthByEmailModel>
      className={'flex flex-col gap-4'}
      methods={store.form}
    >
      <TextField
        label={'Email'}
        name={'email'}
        placeholder={'Email'}
        type={'email'}
      />
      <TextField
        label={'Password'}
        name={'password'}
        placeholder={'Password'}
        type={'password'}
      />

      <Button
        className={'w-full'}
        disabled={store.form.submitting}
        type={'submit'}
      >
        Submit
      </Button>
    </Form>
  );
});
