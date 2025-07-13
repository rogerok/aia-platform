import { Transform } from 'class-transformer';
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
  // TODO: create custom decarator
  @Transform((params) => params.value?.trim)
  @Length(2, 256)
  name: string;

  @IsString()
  @Transform((params) => params.value?.trim)
  instructions: string;
}

export class AgentGetModel {
  @IsString()
  @IsUUID()
  id: string;
}
