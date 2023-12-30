import { SettingsModule } from './settings/settings.module';
import { ContactPageModule } from './contact-page/contact-page.module';
import { ContactModule } from './contact/contact.module';
import { ValidateRequestMiddleware } from './validate-request.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChatGateway } from './gateways/event.gateway';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { WasWirSindModule } from './was-wir-sind/was-wir-sind.module';
import { WasWirTunModule } from './was-wir-tun/was-wir-tun.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 5,
      limit: 5
    }),
    MailModule,
    HomeModule,
    WasWirSindModule,
    WasWirTunModule,
    ContactModule,
    ContactPageModule,
    SettingsModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateRequestMiddleware).forRoutes(AppController);
  }
}
