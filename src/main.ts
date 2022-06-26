import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './user/user.pb';
import { status } from '@grpc/grpc-js';


const microServiceOption = {
  transport: Transport.GRPC,
  options: {
    url: process.env.USER_MICROSERVICE_URL,
    package: protobufPackage,
    protoPath: join('src/user/user.proto'),

  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microServiceOption);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: (validationErrors: ValidationError[] = []) => {
  //       console.error(JSON.stringify(validationErrors));
  //       const asdas = validationErrors.reduce((a, c) => {
  //         a.push(c.constraints)
  //         return a
  //       }, []);
  //       const test= new RpcException({ message: 'E', code: status.UNAUTHENTICATED })
  //       throw test
  //     },
  //     transform: true,
  //     whitelist: true
  //   }),
  // );
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}
bootstrap();
