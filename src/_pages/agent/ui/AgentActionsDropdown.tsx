import { MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentStore } from '@/_pages/agent/store/agentStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AgentActionsDropdown: FC = observer(() => {
  const store = useAgentStore();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={'hover:cursor-pointer'}>
        <MoreVerticalIcon className={'size-4 text-black'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem onClick={store.editDialog.setTrue}>
          <PencilIcon className={'size-4 text-black'} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={store.deleteDialog.setTrue}>
          <TrashIcon className={'size-4 text-black'} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
