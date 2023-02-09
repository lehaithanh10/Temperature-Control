export enum ECollectionName {
  USERS = "users",
  GARDENS = "gardens",
  DEVICES = "devices",
  ACTION = "action",
  MEASURE_DATA = "measure-data",
  BLACKLIST_TOKEN = "blacklist-tokens",
  AUTH_USER = "auth-users",
}

export enum ERoleName {
  USERS = "TC-users",
  ADMINS = "TC-admins",
}

export enum EDeviceType {
  SENSOR = "sensor",
  LIGHT_BULB = "light-bulb",
  ESP = "esp",
}

export enum ELightBulbStatus {
  ON = "ON",
  OFF = "OFF",
}

export const thresholdNumber = {
  temperature: {
    high: {
      unhappy: 30, // plant stop growing
      dead: 40, // plant will dead
    },
    low: {
      unhappy: 5, // plant stop growing
      dead: 0, // plant will dead
    },
  },
  moisture: {
    high: {
      unhappy: 85, // plant stop growing
      dead: 95, // plant will dead
    },
    low: {
      unhappy: 40, // plant stop growing
      dead: 20, // plant will dead
    },
  },
};

export enum EWaringType {
  UNHAPPY = "unhappy",
  DEAD = "dead",
}

export const MAX_DEVICE_CAN_CONNECT_ONE_ESP = 3;
