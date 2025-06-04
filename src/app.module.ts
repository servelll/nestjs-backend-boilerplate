import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-rollbar'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { validate } from 'src/config/environment.validation'
import { APP_PIPE } from '@nestjs/core'

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true
        }),
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                accessToken: configService.get('ROLLBAR_TOKEN'),
                captureUncaught: true,
                captureUnhandledRejections: true
            })
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ]
})
export class AppModule {}
