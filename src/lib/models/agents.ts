import { IsString, IsUUID, Length } from 'class-validator';

import { AgentRouterOutput } from '@/trpc/server/routers/agents';

export class AgentModel implements AgentRouterOutput {
  @IsString()
  @Length(2, 256)
  name: string;

  @IsString()
  instructions: string;

  @IsString()
  updatedAt: string;

  @IsString()
  createdAt: string;

  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @IsUUID()
  id: string;
}

export class AgentCreateModel {
  @IsString()
  @Length(2, 256)
  name: string;

  @IsString()
  instructions: string;
}
