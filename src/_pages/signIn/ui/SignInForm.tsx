import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { AuthByEmailModel } from '@/_pages/signIn/models/auth';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { useRootStore } from '@/lib/stores/rootStore';

export const SignInForm: FC = observer(() => {
  const { authStore } = useRootStore();

  useEffect(() => {
    return () => {
      authStore.form.destroy();
      authStore.form.resetForm();
    };
  }, []);

  return (
    <Form<AuthByEmailModel>
      className={'flex flex-col gap-4'}
      methods={authStore.form}
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

      <Button className={'w-full'} disabled={authStore.loading} type={'submit'}>
        Submit
      </Button>
    </Form>
  );
});
