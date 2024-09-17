enum Status {
  success = 2,
}

const STATUS_BASE = 100;

export const checkStatus = (status: number): boolean => {
  return Boolean(status && Math.floor(status / STATUS_BASE) === Status.success);
};
