import { expect, test, vi, describe } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '@/components/Search';

const mockReplace = vi.fn();
const navigationMock = vi.mock('next/navigation', async () => {
  return {
    useRouter: vi.fn(() => {
      return {
        push: vi.fn(),
        replace: mockReplace,
      };
    }),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    usePathname: () => '/recipes',
  };
});

describe('Search Component', () => {
  test('renders search input', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search recipes');
    expect(input).toBeInTheDocument();
  });

  test('updates search input value', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search recipes');
    fireEvent.change(input, { target: { value: 'chicken' } });
    expect(input).toHaveValue('chicken');
  });

  test('updates search input value and calls replace', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search recipes');
    fireEvent.change(input, { target: { value: 'chicken' } });

    expect(input).toHaveValue('chicken');

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/recipes?page=1&query=chicken');
    });
  });
  test('updates search input value and calls replace with empty query', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search recipes');
    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(input).toHaveValue('');

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/recipes?page=1');
    });
  });
});
