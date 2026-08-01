import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the URKER header', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /добро пожаловать в urker/i })).toBeTruthy();
  expect(screen.getByAltText(/логотип iq center urker/i)).toBeTruthy();
});
