import { Expose, Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

import { isNumber } from '@/lib/utils/isNumber';

export class BaseQueryParamsModel {
  @Expose()
  @IsNumber()
  @Min(1)
  @Transform((params) => (isNumber(params.value) ? Number(params.value) : 1))
  page: number = 1;

  @Expose()
  @Transform((params) => (isNumber(params.value) ? Number(params.value) : 10))
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize: number = 10;
}
