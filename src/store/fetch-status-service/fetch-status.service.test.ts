import { FetchStatus, isFailed, isFulfilled, isInit, isLoading } from '.';

describe('shared store utils', () => {
  describe('fetch status isInit', () => {
    test('should return true if fetch status is init', () => {
      expect(isInit(FetchStatus.INIT)).toBe(true);
    });

    test('should return false for all other fetch statuses', () => {
      expect(isInit(FetchStatus.LOADING)).toBe(false);
      expect(isInit(FetchStatus.FULFILLED)).toBe(false);
      expect(isInit(FetchStatus.FAILED)).toBe(false);
    });
  });

  describe('fetch status isLoading', () => {
    test('should return true if fetch status is loading', () => {
      expect(isLoading(FetchStatus.LOADING)).toBe(true);
    });

    test('should return false for all other fetch statuses', () => {
      expect(isLoading(FetchStatus.INIT)).toBe(false);
      expect(isLoading(FetchStatus.FULFILLED)).toBe(false);
      expect(isLoading(FetchStatus.FAILED)).toBe(false);
    });
  });

  describe('fetch status isFulfilled', () => {
    test('should return true if fetch status is fulfilled', () => {
      expect(isFulfilled(FetchStatus.FULFILLED)).toBe(true);
    });

    test('should return false for all other fetch statuses', () => {
      expect(isFulfilled(FetchStatus.INIT)).toBe(false);
      expect(isFulfilled(FetchStatus.LOADING)).toBe(false);
      expect(isFulfilled(FetchStatus.FAILED)).toBe(false);
    });
  });

  describe('fetch status isFailed', () => {
    test('should return true if fetch status is failed', () => {
      expect(isFailed(FetchStatus.FAILED)).toBe(true);
    });

    test('should return false for all other fetch statuses', () => {
      expect(isFailed(FetchStatus.INIT)).toBe(false);
      expect(isFailed(FetchStatus.LOADING)).toBe(false);
      expect(isFailed(FetchStatus.FULFILLED)).toBe(false);
    });
  });
});
