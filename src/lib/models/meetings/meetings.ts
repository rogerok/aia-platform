import { Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

import { BaseQueryParamsModel } from '@/lib/models/paramsModel';

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
export class MeetingModel {}
