/**
 * Interface of an object holding request throttle settings.
 *
 * @interface IThrottleSettings
 */
export interface IThrottleSettings {
  callsPerInterval: number
  interval: number
}
