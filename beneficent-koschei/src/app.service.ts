import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPing() {
    return { result: 'ok', ts: Date.now() };
  }
}
