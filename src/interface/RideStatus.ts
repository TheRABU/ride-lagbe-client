export const RideStatus = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED_BY_USER: "CANCELLED_BY_USER",
  CANCELLED_BY_DRIVER: "CANCELLED_BY_DRIVER",
  NO_DRIVERS_FOUND: "NO_DRIVERS_FOUND",
} as const;

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];
