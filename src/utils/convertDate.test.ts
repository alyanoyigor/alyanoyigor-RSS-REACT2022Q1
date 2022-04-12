import { convertDate } from './convertDate';

describe('Convert Date', () => {
  it('Paste invalid date', () => {
    expect(convertDate('20-20-2022', { month: '2-digit' })).toEqual({
      day: 'Invalid Date',
      month: 'Invalid Date',
      year: NaN,
    });
  });
  it('Paste valid date and month with 2-digit parameter', () => {
    expect(convertDate('02-20-2022', { month: '2-digit' })).toEqual({
      day: '20',
      month: '02',
      year: 2022,
    });
  });
  it('Paste valid date and month with long parameter', () => {
    expect(convertDate('02-20-2022', { month: 'long' })).toEqual({
      day: '20',
      month: 'February',
      year: 2022,
    });
  });
});
