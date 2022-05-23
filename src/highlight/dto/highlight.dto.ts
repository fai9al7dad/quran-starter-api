import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';
const mistakesTypes = {
  MISTAKE: 'mistake',
  WARNING: 'warning',
  REVERT: 'revert',
};
export class addHighlightDto {
  @IsOptional()
  @IsNumberString()
  werdID: number;
  @IsNotEmpty()
  @IsNumberString()
  wordID: number;
  @IsNotEmpty()
  @IsEnum(mistakesTypes)
  type: string;
}
