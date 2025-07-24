import { Expose } from 'class-transformer';
import { IsString, IsUUID, Length, MaxLength } from 'class-validator';
import 'reflect-metadata';

import { ListModel } from '@/lib/models/listModel';
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

export class AgentsListModel extends ListModel<AgentModel> {}

export class AgentCreateModel {
  @IsString()
  instructions: string;

  @IsString()
  @Length(2, 256)
  name: string;
}

export class AgentGetModel {
  @IsString()
  id: string;
}

export class AgentsQueryModel extends BaseQueryParamsModel {
  @Expose()
  @IsString()
  @MaxLength(256)
  search: string = '';
}

export class AgentDeleteModel {
  @IsString()
  id: string;
}

export class AgentUpdateModel {
  @IsString()
  id: string;

  @IsString()
  instructions: string;

  @IsString()
  @Length(2, 256)
  name: string;
}
