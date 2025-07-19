import { Expose } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import 'reflect-metadata';

import { BaseQueryParamsModel } from '@/lib/models/paramsModel';

export class AgentModel {
  @IsString()
  createdAt: string;

  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  instructions: string;

  // @IsNumber()
  // meetingCount: number;

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

export class AgentsQueryModel extends BaseQueryParamsModel {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(256)
  search: string = '';
}
