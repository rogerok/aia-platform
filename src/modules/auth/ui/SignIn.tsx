import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SignInProps {}

export const SignIn: FC<SignInProps> = (props) => {
  return (
    <div className={'flex flex-col gap-6'}>
      <Card>
        <h1 className={'text-2xl'}>Sign in</h1>
        <CardContent className={'grid md:grid-cols-2'}>
          <div className="">1</div>
          <div className="">1</div>
        </CardContent>
      </Card>
    </div>
  );
};
