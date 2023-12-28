import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './dogs.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/user.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [DogsController],
  providers: [DogsService, UsersService],
})
export class DogsModule {}
