import { inferRouterOutputs } from '@trpc/server';

import { meetingsRouter } from '@/trpc/server/routers/meetings';

export type MeetingsGetManyRouterOutput = inferRouterOutputs<
  typeof meetingsRouter
>['getMany'];

export type MeetingsGetOneRouterOutput = inferRouterOutputs<
  typeof meetingsRouter
>['getOne'];

export type MeetingsGetTranscriptRouterOutput = inferRouterOutputs<
  typeof meetingsRouter
>['getTranscript'];
