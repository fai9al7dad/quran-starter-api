import { IsNotEmpty, IsNumberString } from 'class-validator';

export class addWerdDto {
  @IsNotEmpty()
  @IsNumberString()
  duoID: number;
}
