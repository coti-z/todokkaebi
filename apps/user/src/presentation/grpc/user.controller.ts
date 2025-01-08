import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  @GrpcMethod()
  getUser(
    data: { user_id: string },
    metadata: any,
  ): { user_id: string; name: string; age: number } {
    console.log(metadata);
    return {
      user_id: data.user_id,
      name: 'Alice',
      age: 20,
    };
  }
}
