import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export class UserDto {

  @ApiProperty({
    description: "user name",
    example: "yago araújo",
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    description: "user email",
    example: "yagoaraujo19@gmail.com",
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "user strong password",
    example: "UmaSen!For12@",
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
