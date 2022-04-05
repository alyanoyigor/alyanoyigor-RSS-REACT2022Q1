import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FormCard } from './index';

describe('Form Card', () => {
  beforeEach(() => {
    const CARD_TEST_PROPS = {
      fullName: 'Ann',
      birthday: new Date('2000-02-02'),
      srcImg: 'src/path/test',
      gender: 'female',
      country: 'Austria',
      city: 'Wien',
      zipCode: '20202',
    };
    render(<FormCard {...CARD_TEST_PROPS} />);
  });
  it('Card has title', () => {
    const title = screen.getByTestId('title-form-card');
    expect(title).toHaveTextContent(/Ann/i);
  });
  it('Card has birthday', () => {
    const birthday = screen.getByTestId('birthday-form-card');
    expect(birthday).toHaveTextContent(/Feb 02, 2000/i);
  });
  it('Card has country, city and zip code', () => {
    const location = screen.getByTestId('location-form-card');
    expect(location).toHaveTextContent(/Wien, Austria, 20202/i);
  });
  it('Card has src for image', () => {
    const image: HTMLImageElement = screen.getByTestId('image-form-card');
    expect(image).toHaveAttribute('src', 'src/path/test');
  });
});
