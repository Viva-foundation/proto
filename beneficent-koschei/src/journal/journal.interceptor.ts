import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JournalService } from './journal.service';
import { map } from 'rxjs/operators';
@Injectable()
export class JournalInterceptor implements NestInterceptor {
  private readonly logger = new Logger(JournalInterceptor.name);
  constructor(private journalService: JournalService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { url, method, ip } = request;
    this.logger.verbose(
      `Request ${method}:${url} by ${
        request.user?.id || 'nobody'
      } from ${ip} with ${request.headers['user-agent']}`,
    );
    this.journalService.writeRequest({
      ua: request.headers['user-agent'],
      url,
      method,
      user: request.user?.id,
      ip,
    });
    return next.handle();
  }
}
