/**
 * @namespace user
 */
import {
  Controller, Inject, UseInterceptors,
  UseFilters,
  ValidationPipe,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateUserReq, CreateUserRes, FindRequest, FindRes, RemoveUserRes, User_SERVICE_NAME, UpdateUserRes, FindAllRes, UpdateUserReq } from './user.pb';
import { CreateUserDto } from './dto/create-user.dto';
import { FindIdUserDto } from './dto/find-id-user.dto';

import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { ExceptionFilter } from './rpc-exception-filter';


// import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
// import { ErrorFilter } from 'src/common/filters/errors.filter';
// import { AdminMessage } from './enums/messages.enum';


/**
  * @class UserController  
  * @memberof user
  * @description کلاس کنترلر مربوط به عملیات کراد برای مدیریت کاربران در میکروسرویس
  */
@Controller('user')
// @UseFilters(ErrorFilter)
//@UsePipes(ValidationPipe)
export class UserController {

  @Inject(UserService)
  private readonly service: UserService;
  /**
     * @typedef CreateUserReq
     * @param {string} name   
     * @param {string} nationalCode   
     * @param {number} age   
     * @param {string} address   
     */
  /**
  * @typedef User
  * @param {string} id   
  * @param {string} name   
  * @param {string} nationalCode   
  * @param {number} age   
  * @param {string} address   
  */
  /**
   * @memberof user.UserController
   * @summary متد ایجاد کاربر جدید
   * @param {CreateUserReq}payload ورودی برای ایجاد کاربر جدید
   * @returns User
   */
  //@UseFilters(new ExceptionFilter())
  @GrpcMethod(User_SERVICE_NAME, 'createUser')
  private async createUser(payload: CreateUserDto): Promise<CreateUserRes> {
    try {
      let res = await this.service.create(payload);;
      return res;
    } catch (e) {
      console.log(">>>>>", e)
      throw new RpcException(e)

    }
  }

  /**
     * @typedef FindOne
     * @param {string} name   
     * @param {string} nationalCode   
     * @param {number} age   
     * @param {string} address   
     */
  /**
     * @typedef FindRes
     * @param {FindOne} data   
     * @param {number} status   
     * @param {Array} error   
     */
  /**
    * @typedef FindAllRes
    * @param {FindOne[]} data   
    * @param {number} status   
    * @param {Array} error   
    */

  /**
    * @memberof user.UserController
    * @summary متد دریافت اطلاعات کاربر با استفاده از شناسه  
    * @param {number}id شناسه کاربر 
    * @returns FindRes
    */
  @GrpcMethod(User_SERVICE_NAME, 'findById')
  private findById(payload: FindIdUserDto): Promise<FindRes> {
    return this.service.findById(payload);
  }

  /**
     * @memberof user.UserController
     * @summary متد دریافت اطلاعات کاربر    
     * @returns FindAllRes
     */
  @GrpcMethod(User_SERVICE_NAME, 'findAll')
  private findAll(): Promise<FindAllRes> {
    return this.service.findAll();
  }
  /**
     * @typedef RemoveUserRes
     * @param {number} id   
     * @param {number} status   
     * @param {Array} error   
     */
  /**
    * @memberof user.UserController
    * @summary متد حذف اطلاعات کاربر با استفاده از شناسه  
    * @param {string}id شناسه کاربر 
    * @returns RemoveUserRes
    */

  @GrpcMethod(User_SERVICE_NAME, 'removeUser')
  private removeUser(payload: FindIdUserDto): Promise<RemoveUserRes> {
    return this.service.remove(payload);
  }
  /**
    * @memberof user.UserController
    * @summary متد ویرایش اطلاعات کاربر با استفاده از شناسه  
    * @param {string}id شناسه کاربر 
    * @param {CreateUserReq}body اطلاعات ویرایش شده کاربر 
    * @returns FindRes
    */
  @GrpcMethod(User_SERVICE_NAME, 'updateUser')
  private updateUser(payload: UpdateUserReq): Promise<UpdateUserRes> {
    return this.service.update(payload);
  }
}

