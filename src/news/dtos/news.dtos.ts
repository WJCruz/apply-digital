/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
  Min,
  IsArray,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateNewDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly created_at: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  readonly url: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly points: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly story_text: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly comment_text: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly num_comments: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly story_id: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly story_title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly story_url: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly parent_id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly created_at_i: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  readonly _tags: string[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly objectID: string;
}

export class UpdateNewDto extends PartialType(CreateNewDto) {}

export class FilterNewsDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly author: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  readonly _tags: string[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly title: string;
}

export class PageNewsDto {
  @IsOptional()
  @Min(0)
  page: number;
}
