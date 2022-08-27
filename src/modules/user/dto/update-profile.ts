import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
}
