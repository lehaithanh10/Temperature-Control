import { Controller, Inject } from "@nestjs/common";
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from "@nestjs/microservices";
import { CreateMeasureDataDto } from "../measure-data/dto/create-measure-data.dto";
import { MeasureDataUtil } from "../utils/measure-data.util";
import { MQTTTopic } from "../utils/mqtt/types";

@Controller("math")
export class MQTTController {
  constructor(private readonly measureDataUtil: MeasureDataUtil) {}

  @MessagePattern(MQTTTopic.GET_MEASURE_DATA)
  async getNotifications(
    @Payload() measureData: CreateMeasureDataDto,
    @Ctx() context: MqttContext
  ) {
    const deviceId = context.getTopic().split("/")[2];

    await this.measureDataUtil.pushGardenMeasureData(deviceId, measureData);
  }
}
