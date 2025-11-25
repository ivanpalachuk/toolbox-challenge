import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../ui/Footer';

describe('Footer Component', () => {
  test('renders footer with author name', () => {
    render(<Footer />);
    const nameElement = screen.getByText(/Ivan Palachuk/i);
    expect(nameElement).toBeInTheDocument();
  });

  test('renders LinkedIn link', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link', { name: /linkedin/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
  });

  test('renders phone number', () => {
    render(<Footer />);
    const phoneElement = screen.getByText(/223/);
    expect(phoneElement).toBeInTheDocument();
  });

  test('footer has gradient background', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});
