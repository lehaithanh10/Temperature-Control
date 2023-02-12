import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class MQTTUtil {
  constructor(@Inject("MQTT_CLIENT") private client: ClientProxy) {
    client.connect();
  }

  publish(data: object, topic: string) {
    this.client.emit(topic, data);
  }
}
