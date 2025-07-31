'use client';

import { SearchIcon, XCircleIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { useAgentsStore } from '@/_pages/agents/store/agentsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AgentsQueryModel } from '@/lib/models/agents/agents';

export const AgentsSearchFilter: FC = observer(() => {
  const { searchParamsHandler } = useAgentsStore();

  const [filter, setFilter] = useState<string>('');

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex gap-2'}>
        <div className={'relative'}>
          <Input
            className={'w-[200]px h-9 bg-white pl-7'}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={'Filter by name'}
            value={filter}
          />
          <SearchIcon
            className={
              'text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2'
            }
          />
        </div>
        <Button
          onClick={() =>
            searchParamsHandler?.setQueryParams(new AgentsQueryModel())
          }
          variant={'outline'}
        >
          <XCircleIcon />
        </Button>
      </div>
      <div>
        <Button
          onClick={() =>
            searchParamsHandler?.setQueryParams({
              ...new AgentsQueryModel(),
              search: filter,
            })
          }
          size={'sm'}
        >
          Find
        </Button>
      </div>
    </div>
  );
});
