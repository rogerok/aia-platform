'use client';

import { SearchIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingsStore } from '@/_pages/meetings/store/meetingsStore';
import { MeetingsStatusSelect } from '@/_pages/meetings/ui/search/MeetingsStatusSelect';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { AgentSelect } from '@/components/form/selects/AgentSelect';
import { Button } from '@/components/ui/button';
import { MeetingsQueryModel } from '@/lib/models/meetings/meetings';

export const MeetingsSearchFilter: FC = observer(() => {
  const { searchForm } = useMeetingsStore();

  return (
    <Form methods={searchForm}>
      <div className={'flex flex-col gap-2'}>
        <div className={'flex items-center gap-2'}>
          <div className={'relative'}>
            <TextField
              className={'w-[200]px bg-white pl-7'}
              name={'search'}
              placeholder={'Filter by name'}
            />
            <SearchIcon
              className={
                'text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2'
              }
            />
          </div>
          <MeetingsStatusSelect />
          <AgentSelect />
        </div>
        <div className={'flex gap-8'}>
          <Button disabled={searchForm.submitting} type={'submit'}>
            Submit
          </Button>
          <Button
            disabled={searchForm.submitting}
            onClick={() => searchForm.resetForm(new MeetingsQueryModel())}
            type={'button'}
          >
            Clear
          </Button>
        </div>
      </div>
    </Form>
  );
});
