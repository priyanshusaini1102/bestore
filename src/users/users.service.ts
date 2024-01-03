import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

export type UserType = any;
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const createdUer = new this.userModel(createUserDto);
    return createdUer.save();
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(username: string): Promise<UserType | undefined> {
    return this.userModel.findOne({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }

  async removeAll() {
    try {
      await this.userModel.deleteMany({});
      console.log('All documents removed successfully.');
    } catch (error) {
      console.error('Error removing documents:', error);
    }
  }
}
