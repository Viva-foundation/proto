import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
    if (!configService.get('JWT_SECRET')) {
      this.logger.error(
        'JWT_SECRET not found in .env file. This is critical error. Please add JWT_SECRET to .env file.',
      );
    }
  }

  async validate(payload: any) {
    this.logger.log(`Validate user ${payload.sub} with JWT`);
    return await this.usersService.getUser(payload.sub);
  }
}
