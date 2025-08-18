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
  cancelled: 'cancelled',
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
  @ValidateNested()
  agent: AgentModel;

  @IsString()
  agentId: string;

  @IsString()
  createdAt: string;

  @ValidateIf((_, value) => value !== null)
  @IsNumber()
  duration: number | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  endedAt: string | null;

  @IsString()
  id: string;

  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  recordingUrl: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  startedAt: string | null;

  @IsIn(meetingStatusList)
  status: MeetingStatusType;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  summary: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  transcriptUrl: string | null;

  @IsString()
  updatedAt: string;

  @IsString()
  userId: string;

  get isActive(): boolean {
    return this.status === MeetingStatusConstant.active;
  }

  get isCanceled(): boolean {
    return this.status === MeetingStatusConstant.cancelled;
  }

  get isCompleted(): boolean {
    return this.status === MeetingStatusConstant.completed;
  }

  get isProcessing(): boolean {
    return this.status === MeetingStatusConstant.processing;
  }

  get isUpcoming(): boolean {
    return this.status === MeetingStatusConstant.upcoming;
  }
}

export class MeetingsListModel extends ListModel<MeetingModel> {}

export class MeetingCreateModel {
  @IsString()
  agentId: string = '';

  @IsString()
  @Length(2, 256)
  name: string = '';
}

export class MeetingDeleteModel {
  @IsString()
  id: string;
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
