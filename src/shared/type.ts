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

export const MAX_DEVICE_CAN_CONNECT_ONE_ESP = 3;
