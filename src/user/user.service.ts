import { HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { CreateUserReq, CreateUserRes, FindAllRes, FindRequest, FindRes, RemoveUserReq, RemoveUserRes, UpdateUserReq, UpdateUserRes, User_SERVICE_NAME } from './user.pb';
//import {ExceptionFilter} from './rpc-exception-filter'


@Injectable()
export class UserService {


  @InjectRepository(User)
  private readonly repository: Repository<User>;

  //@UseFilters(new ExceptionFilter())
  public async create(payload: CreateUserReq): Promise<CreateUserRes> {
    try {
      const user: User = new User();

      user.name = payload.name;
      user.nationalCode = payload.nationalCode;
      user.age = payload.age;
      user.address = payload.address;

      await this.repository.save(user);

      return { id: user.id, error: null, status: HttpStatus.OK };
    }
    catch(e){
      throw e;
    }
  
  }

  public async findById(payload: FindRequest): Promise<FindRes> {
    const user: User = await this.repository.findOne({ where: { id: payload.id } });

    if (!user) {
      return { data: null, error: ['User not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: user, error: null, status: HttpStatus.OK };

  }
  public async findAll(): Promise<FindAllRes> {
    const user: User[] = await this.repository.find();

    if (!user) {
      return { data: null, error: ['User not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: user, error: null, status: HttpStatus.OK };

  }

  public async remove(payload: RemoveUserReq): Promise<RemoveUserRes> {
    const user: User = await this.repository.findOne({ where: { id: payload.id } });
    await this.repository.delete({ id: payload.id });
    if (!user) {
      return { id: payload.id, error: ['User not found'], status: HttpStatus.NOT_FOUND };
    }

    return { id: payload.id, error: null, status: HttpStatus.OK };

  }

  public async update(payload: UpdateUserReq): Promise<UpdateUserRes> {
    const user: User = await this.repository.findOne({ where: { id: payload.id } });
    if (user) {
      user.name = payload.name;
      user.age = payload.age;
      user.nationalCode = payload.nationalCode;
      user.address = payload.address;

      await this.repository.save(user);

      return { data: user, error: null, status: HttpStatus.OK };

    }
    return { data: null, error: ['User not found'], status: HttpStatus.NOT_FOUND };

  }
}