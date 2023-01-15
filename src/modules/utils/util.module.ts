import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { DeviceCoreModule } from "../device/device.core.module";
import { MeasureDataCoreModule } from "../measure-data/measure-data.core.module";
import { UserCoreModule } from "../user/user.core.module";
import { AuthUserUtil } from "./auth-user.utils";
import { MeasureDataUtil } from "./measure-data.util";
import { OutboundResponseSerializer } from "./mqtt/mqtt.interceptor";
import { MQTTUtil } from "./mqtt/mqtt.util";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MQTT_CLIENT",
        transport: Transport.MQTT,
        options: {
          url: "mqtt://broker.hivemq.com:1883",
          serializer: new OutboundResponseSerializer(),
        },
      },
    ]),
    UserCoreModule,
    DeviceCoreModule,
    MeasureDataCoreModule,
  ],
  providers: [AuthUserUtil, MeasureDataUtil, MQTTUtil],
  exports: [AuthUserUtil, MeasureDataUtil, MQTTUtil],
})
export class UtilModule {}
