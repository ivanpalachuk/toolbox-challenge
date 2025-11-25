import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../ui/Header';

describe('Header Component', () => {
  test('renders header with logo', () => {
    render(<Header />);
    const logoElement = screen.getByAltText(/Toolbox Logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    render(<Header />);
    const subtitleElement = screen.getByText(/Toolbox Challenge/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('header has correct structure', () => {
    const { container } = render(<Header />);
    const navbar = container.querySelector('.navbar');
    expect(navbar).toBeInTheDocument();
  });

  test('logo has correct src attribute', () => {
    render(<Header />);
    const logo = screen.getByAltText(/Toolbox Logo/i);
    expect(logo).toHaveAttribute('src', '/logo-toolbox.svg');
  });

  test('header has gradient background', () => {
    const { container } = render(<Header />);
    const navbar = container.querySelector('.navbar');
    expect(navbar).toHaveStyle({ background: 'linear-gradient(135deg, rgb(150, 47, 58) 0%, #000000 100%)' });
  });
});
