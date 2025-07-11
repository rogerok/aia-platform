import { IsDate, IsString, IsUUID, Length } from 'class-validator';

import { SelectAgent } from '@/db/models/agents';

export class AgentModel implements SelectAgent {
  @IsString()
  @Length(2, 256)
  name: string;

  @IsString()
  instructions: string;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  createdAt: Date;

  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @IsUUID()
  id: string;
}
