import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true';
  })
  public completed?: boolean;
}
