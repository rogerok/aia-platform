import { MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { FC } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AgentActionsDropdown: FC = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={'hover:cursor-pointer'}>
        <MoreVerticalIcon className={'size-4 text-black'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem>
          <PencilIcon className={'size-4 text-black'} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <TrashIcon className={'size-4 text-black'} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
