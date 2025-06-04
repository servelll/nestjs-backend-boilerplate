import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { UUID } from 'uuidv7'

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: UUID

    @ApiProperty()
    @IsEmail()
    email: string
}
