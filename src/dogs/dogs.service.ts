import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dog } from './dogs.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.schema';

@Injectable()
export class DogsService {
  constructor(
    @InjectModel(Dog.name) private dogModel: Model<Dog>,
    private usersService: UsersService,
  ) {}
  create(createDogDto: CreateDogDto): Promise<Dog> {
    // `This action adds a new dog`;
    const createdCat = new this.dogModel(createDogDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    // `This action returns all dogs`;
    const users = await this.usersService.findAll();
    return users;
  }

  findOne(id: string) {
    // `This action returns a #${id} dog`;
    return this.dogModel.findById(id);
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    // `This action updates a #${id} dog`;
    return this.dogModel.findByIdAndUpdate(id, updateDogDto);
  }

  remove(id: string) {
    // `This action removes a #${id} dog`;
    return this.dogModel.findByIdAndDelete(id);
  }
}
