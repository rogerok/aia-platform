import { IsNumber, IsString, IsUUID, Length } from 'class-validator';

import { AgentRouterOutput } from '@/trpc/server/routers/agents';

export class AgentModel implements AgentRouterOutput {
  @IsString()
  createdAt: string;

  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  instructions: string;

  @IsNumber()
  meetingCount: number;

  @IsString()
  @Length(2, 256)
  name: string;

  @IsString()
  updatedAt: string;

  @IsString()
  @IsUUID()
  userId: string;
}

export class AgentCreateModel {
  @IsString()
  instructions: string;

  @IsString()
  @Length(2, 256)
  name: string;
}

export class AgentGetModel {
  @IsString()
  @IsUUID()
  id: string;
}
