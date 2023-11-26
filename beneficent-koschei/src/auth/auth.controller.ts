import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local/local-auth.guard';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  signUp(@Body() body: Record<string, any>) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post('renew')
  renew(@Request() req) {
    return this.authService.login(req.user);
  }
}
