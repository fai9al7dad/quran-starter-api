import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
export class addDuoDto {
  @IsNotEmpty()
  // @IsNumber()
  @IsNumberString()
  reciter: number;
}
