import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { USER_NOT_FOUND, WRONG_PASSWORD } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt)
    });

    return await newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }
    const isPasswordMatch = await compare(password, user?.passwordHash);
    if (!isPasswordMatch) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      acces_token: await this.jwtService.signAsync(payload)
    };
  }
}
