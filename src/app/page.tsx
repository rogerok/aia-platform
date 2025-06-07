'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth';

interface PageProps {
  className?: string;
}

const Page = (props: PageProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (ctx) => {
          console.error(ctx.error);
        },
        onSuccess: (ctx) => console.log(ctx.response),
      },
    );
  };

  return (
    <div className={'flex border-2 text-4xl font-bold text-gray-600'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={'flex w-1/4 flex-col items-center justify-center gap-1'}
      >
        <Input onChange={(e) => setName(e.target.value)} value={name} />
        <Input onChange={(e) => setEmail(e.target.value)} value={email} />
        <Input onChange={(e) => setPassword(e.target.value)} value={password} />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Page;
