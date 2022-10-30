import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModel,
        schemaOptions: {
          collection: 'Auth'
        }
      }
    ])
  ]
})
export class AuthModule {}
