import { Expose } from 'class-transformer';
import { IsIn, IsString, MaxLength } from 'class-validator';

import { meetingStatusList } from '@/db/schemas/schema';
import { ListModel } from '@/lib/models/listModel';
import { BaseQueryParamsModel } from '@/lib/models/paramsModel';

type MeetingStatusType = (typeof meetingStatusList)[number];

export class MeetingGetModel {
  @IsString()
  id: string;
}

export class MeetingsQueryModel extends BaseQueryParamsModel {
  @Expose()
  @IsString()
  @MaxLength(256)
  search: string = '';
}

export class MeetingModel {
  @IsString()
  agentId: string;

  @IsString()
  createdAt: string;

  @IsString()
  endedAt: string;

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

export class MeetingsListModel extends ListModel<MeetingModel> {}
