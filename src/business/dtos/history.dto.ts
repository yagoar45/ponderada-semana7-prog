import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class HistoryDto {
  @ApiProperty({
    description: "history title",
    example: "A Volta dos Que Não Foram",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "history description",
    example: "foram e não voltaram mais",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "history category",
    example: "Ação e Aventura",
  })
  @IsString()
@IsNotEmpty()
  category: string;
}
