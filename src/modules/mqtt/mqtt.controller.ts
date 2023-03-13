import { Controller } from "@nestjs/common";
import {
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

  @MessagePattern(MQTTTopic.MEASURE_DATA)
  async getMeasureDataNotifications(
    @Payload() measureData: CreateMeasureDataDto,
    @Ctx() context: MqttContext
  ) {
    const deviceId = context.getTopic().split("/")[2];

    console.info(
      "MQTT package received",
      JSON.stringify(
        {
          topic: context.getTopic(),
          payload: measureData,
        },
        null,
        2
      )
    );

    await this.measureDataUtil.pushGardenMeasureData(deviceId, measureData);
  }
}
