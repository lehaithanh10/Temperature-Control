import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags("health")
  @Get()
  @ApiOperation({
    operationId: "heathCheck",
    description: "Operation for check server health",
    summary: "Heath Check",
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
