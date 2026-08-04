import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the URKER header', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /баулу мектепте балалар/i })).toBeTruthy();
  expect(screen.getByAltText(/urker baulu mektebi/i).getAttribute('src')).toBe('/images/Urker-logo.png');
});
