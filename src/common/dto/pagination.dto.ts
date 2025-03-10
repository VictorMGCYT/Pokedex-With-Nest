import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @Min(0)
    offset?: number;

}