import { IsNotEmpty, IsNumber, IsString, Matches, Max, Min, validateSync } from 'class-validator'
import { plainToInstance } from 'class-transformer'

export class EnvironmentVariables {
    @IsNumber()
    @Min(1)
    @Max(65535)
    PORT: number

    @Matches(/^[a-f0-9]{32}$/)
    ROLLBAR_TOKEN: string
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true })
    const errors = validateSync(validatedConfig, { skipMissingProperties: false })

    if (errors.length > 0) {
        throw new Error(errors.toString())
    }
    return validatedConfig
}
