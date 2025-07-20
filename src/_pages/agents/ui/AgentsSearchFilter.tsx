'use client';

import { SearchIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStore } from '@/_pages/agents/store/AgentsStore';
import { Input } from '@/components/ui/input';

export const AgentsSearchFilter: FC = observer(() => {
  const { searchParamsHandler } = useAgentsStore();

  return (
    <div className={'relative'}>
      <Input
        className={'w-[200]px h-9 bg-white pl-7'}
        onChange={(e) => {
          searchParamsHandler?.setParam('search', e.target.value);
        }}
        placeholder={'Filter by name'}
        value={searchParamsHandler?.params.search ?? ''}
      />
      <SearchIcon
        className={
          'text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2'
        }
      />
    </div>
  );
});
