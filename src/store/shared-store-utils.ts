export enum FetchStatus {
  INIT,
  LOADING,
  FAILED,
  FULFILLED,
}

export function isInit(status: FetchStatus): boolean {
  return status === FetchStatus.INIT;
}

export function isLoading(status: FetchStatus): boolean {
  return status === FetchStatus.LOADING;
}

export function isFulfilled(status: FetchStatus): boolean {
  return status === FetchStatus.FULFILLED;
}

export function isFailed(status: FetchStatus): boolean {
  return status === FetchStatus.FAILED;
}
