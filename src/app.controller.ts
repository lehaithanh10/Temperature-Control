import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@Controller()
export class AppController {
  @ApiTags("health")
  @Get()
  @ApiOperation({
    operationId: "heathCheck",
    description: "Operation for check server health",
    summary: "Heath Check",
  })
  getHello(): string {
    return "Hello World!";
  }
}
