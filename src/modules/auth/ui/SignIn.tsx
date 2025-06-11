'use client';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MobxForm } from '@/lib/form/mobxForm';

type TestForm = {
  email: string;
  name: string;
  password: string;
};

export const SignIn = observer(() => {
  const [form] = useState(
    () =>
      new MobxForm<TestForm>({
        abortController: new AbortController(),
        defaultValues: {
          email: '',
          name: '',
          password: '',
        },
        lazyUpdates: false,
        onSubmit: (values) => {
          console.log(values);
        },
      }),
  );

  return (
    <div className={'flex flex-col gap-6'}>
      <Card>
        <h1 className={'text-2xl'}>Sign in</h1>
        <CardContent className={'grid md:grid-cols-2'}>
          <div className="">1</div>
          <div className="">1</div>
          <Form<TestForm> methods={form}>
            <TextField name={'email'} />
            <TextField name={'password'} />
            {/*<Button type={'submit'}>Submit</Button>*/}
          </Form>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.destroy();
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});
