import { EWaringType, thresholdNumber } from "./type";

export interface IWarningData {
  temperature?: number;
  moisture?: number;
  warningType: {
    temperature?: EWaringType;
    moisture?: EWaringType;
  };
}

export interface INotificationType extends IWarningData {
  gardenId: string;
}

export const isTemperatureWaring = (temperature: number) => {
  return (
    temperature > thresholdNumber.temperature.high.unhappy ||
    temperature < thresholdNumber.temperature.low.unhappy
  );
};

export const isMoistureWaring = (moisture: number) => {
  return (
    moisture > thresholdNumber.moisture.high.unhappy ||
    moisture < thresholdNumber.moisture.low.unhappy
  );
};

export const isWaringThreshold = ({
  temperature,
  moisture,
}: {
  temperature: number;
  moisture: number;
}) => {
  return isTemperatureWaring(temperature) || isMoistureWaring(moisture);
};

export const executeWarningType = ({
  temperature,
  moisture,
}: {
  temperature: number;
  moisture: number;
}) => {
  let result = {} as IWarningData;
  if (
    (temperature > thresholdNumber.temperature.high.unhappy &&
      temperature < thresholdNumber.temperature.high.dead) ||
    (temperature < thresholdNumber.temperature.low.unhappy &&
      temperature > thresholdNumber.temperature.low.dead)
  ) {
    result = {
      ...result,
      temperature,
      warningType: { temperature: EWaringType.UNHAPPY },
    };
  }
  if (
    temperature > thresholdNumber.temperature.high.dead ||
    temperature < thresholdNumber.temperature.low.dead
  ) {
    result = {
      ...result,
      temperature,
      warningType: { temperature: EWaringType.DEAD },
    };
  }
  if (
    (moisture > thresholdNumber.moisture.high.unhappy &&
      moisture < thresholdNumber.moisture.high.dead) ||
    (moisture < thresholdNumber.moisture.low.unhappy &&
      moisture > thresholdNumber.moisture.low.dead)
  ) {
    result = {
      ...result,
      moisture,
      warningType: { ...result.warningType, moisture: EWaringType.UNHAPPY },
    };
  }
  if (
    moisture > thresholdNumber.temperature.high.dead ||
    moisture < thresholdNumber.moisture.low.dead
  ) {
    result = {
      ...result,
      moisture,
      warningType: { ...result.warningType, moisture: EWaringType.DEAD },
    };
  }

  return result;
};
