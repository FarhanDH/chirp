import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AppLoggerMiddleware } from './logger.middleware';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }), UserModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes('*');
  }
}
