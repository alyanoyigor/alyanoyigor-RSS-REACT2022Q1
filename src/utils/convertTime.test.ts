import { convertTime } from './convertTime';

describe('Convert Time', () => {
  it('Paste valid number', () => {
    expect(convertTime(100)).toBe('1h40m');
  });
});
