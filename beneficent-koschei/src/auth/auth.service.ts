import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../db/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    inputEmail: string,
    inputPassword: string,
  ): Promise<Partial<UserEntity> | null> {
    const user = await this.usersService.findOne(inputEmail);
    console.log(inputEmail, inputPassword, user);
    if (!(await this.usersService.validatePassword(inputPassword, user))) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...result } = user;
    return result;
  }

  async login(user: UserEntity) {
    const payload = { username: user.name, sub: user.id, roles: user.roleList };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(login: string, password: string, name: string): Promise<any> {
    return await this.usersService.create(login, password, name);
  }
}
