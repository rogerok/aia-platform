import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { meetingStatusList } from '@/db/schemas/schema';
import { AgentModel } from '@/lib/models/agents/agents';
import { ListModel } from '@/lib/models/listModel';
import { BaseQueryParamsModel } from '@/lib/models/paramsModel';

export type MeetingStatusType = (typeof meetingStatusList)[number];

export const MeetingStatusConstant: Record<
  MeetingStatusType,
  MeetingStatusType
> = {
  active: 'active',
  canceled: 'canceled',
  completed: 'completed',
  processing: 'processing',
  upcoming: 'upcoming',
};

export class MeetingGetModel {
  @IsString()
  id: string;
}

export class MeetingsQueryModel extends BaseQueryParamsModel {
  @Expose()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  agentId: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(256)
  search: string = '';

  @Expose()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsIn(meetingStatusList)
  status: MeetingStatusType | null = null;
}

export class MeetingModel {
  @IsString()
  agentId: string;

  @IsString()
  createdAt: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  endedAt: string | null;

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  recordingUrl: string;

  @IsString()
  startedAt: string;

  @IsIn(meetingStatusList)
  status: MeetingStatusType;

  @IsString()
  summary: string;

  @IsString()
  transcriptUrl: string;

  @IsString()
  updatedAt: string;

  @IsString()
  userId: string;
}
export class MeetingsListItemModel extends MeetingModel {
  @ValidateNested()
  agent: AgentModel;

  @IsNumber()
  duration: number;
}

export class MeetingsListModel extends ListModel<MeetingsListItemModel> {}

export class MeetingCreateModel {
  @IsString()
  agentId: string = '';

  @IsString()
  @Length(2, 256)
  name: string = '';
}

export class MeetingEditModel {
  @IsString()
  agentId: string;

  @IsString()
  id: string;

  @IsString()
  @Length(2, 256)
  name: string;
}
