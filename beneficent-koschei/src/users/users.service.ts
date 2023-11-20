import { Injectable } from '@nestjs/common';
import { UserEntity } from '../db/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({
      where: { email, isRemoved: false, isActive: true },
    });
  }

  async validatePassword(
    password: string,
    user?: UserEntity,
  ): Promise<boolean> {
    console.log(user, password);
    if (!user) return false;
    return bcrypt.compare(password, user.hash);
  }

  async getUser(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async create(
    login: string,
    password: string,
    name: string,
  ): Promise<UserEntity> {
    const hash = await bcrypt.hash(password, 10);
    const user = new UserEntity();
    user.email = login;
    user.roleList = [
      Role.NOBODY,
      Role.PHARMACIST,
      Role.DOCTOR,
      Role.ADMIN,
      Role.SUPERVISOR,
    ];
    user.name = name;
    user.hash = hash;
    return await this.usersRepository.save(user);
  }
}
