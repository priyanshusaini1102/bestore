import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DogsModule } from './dogs/dogs.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/user.schema';
import { JwtMiddleware } from './auth/jwt.middleware';

@Module({
  imports: [
    PassportModule, // Import PassportModule
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Set the expiration time for the JWT
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    DogsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // AuthsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, AuthService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
