import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC } from 'react';

import { useAgentStore } from '@/_pages/agent/store/agentStore';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { routes } from '@/lib/constants/routes';

export const AgentBreadcrumbs: FC = observer(() => {
  const store = useAgentStore();

  return (
    store.data && (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={'text-xl font-medium'}>
              <Link href={routes.agents()}>Agents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator
            className={'text-foreground text-xl font-medium'}
          />
          <BreadcrumbItem>
            <BreadcrumbPage className={'text-xl font-medium'}>
              {store.data.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  );
});
