import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { routes } from '@/lib/constants/routes';

export const MeetingBreadcrumbs: FC = observer(() => {
  const store = useMeetingStore();

  return (
    store.meeting && (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={'text-xl font-medium'}>
              <Link href={routes.meetings()}>Meetings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator
            className={'text-foreground text-xl font-medium'}
          />
          <BreadcrumbItem>
            <BreadcrumbPage className={'text-xl font-medium'}>
              {store.meeting.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  );
});
