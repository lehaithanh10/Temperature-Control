import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Injectable()
export class InjectDataFieldToResponseInterceptor implements NestInterceptor {
  intercept(
    ctx: ExecutionContext,
    call$: CallHandler<Record<string, unknown>>
  ) {
    return call$.handle().pipe(mergeMap((data) => from(this.injectData(data))));
  }

  async injectData(data: Record<string, unknown> | null) {
    return { data };
  }
}
