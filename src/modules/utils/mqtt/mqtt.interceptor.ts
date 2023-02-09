import { Serializer, OutgoingResponse } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

export class OutboundResponseSerializer implements Serializer {
  private readonly logger = new Logger("OutboundResponseIdentitySerializer");

  serialize(value: any): OutgoingResponse {
    this.logger.debug(
      `-->> Serializing MQTT response: \n${JSON.stringify(value, null, 2)}`
    );
    return value.data;
  }
}
