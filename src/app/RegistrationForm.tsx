'use client';

import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth';
import { useRootStore } from '@/lib/store-adapter/store';

export const RegistrationForm: FC = observer((props) => {
  const store = useRootStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (ctx) => {
          console.error(ctx.error);
        },
      },
    );
  };

  return (
    <form className={'flex w-1/4 flex-col items-center justify-center gap-1'}>
      <Input onChange={(e) => setName(e.target.value)} value={name} />
      <Input onChange={(e) => setEmail(e.target.value)} value={email} />
      <Input onChange={(e) => setPassword(e.target.value)} value={password} />
      <Button onClick={handleSubmit}>Register</Button>
    </form>
  );
});
