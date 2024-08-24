import { test, expect, describe, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import CategoryFilter from '@/components/CategoryFilter';

const mockReplace = vi.fn();

vi.mock('next/navigation', () => {
  return {
    useSearchParams: vi.fn(() => new URLSearchParams()),
    useRouter: vi.fn(() => {
      return {
        replace: mockReplace,
      };
    }),
    usePathname: vi.fn(() => '/recipes'),
  };
});

describe('CategorFilter Component', () => {
  test('renders category select', () => {
    render(<CategoryFilter />);
    const select = screen.getByLabelText('Filter by Category');
    expect(select).toBeVisible();
  });

  test('updates category select value', () => {
    render(<CategoryFilter />);
    const select = screen.getAllByLabelText('Filter by Category');
    fireEvent.change(select[0], { target: { value: 'BREAKFAST' } });
    expect(select[0]).toHaveValue('BREAKFAST');
  });
  test('updates category select value and calls replace', async () => {
    render(<CategoryFilter />);
    const select = screen.getByLabelText('Filter by Category');
    fireEvent.change(select, { target: { value: 'BREAKFAST' } });
    expect(select).toHaveValue('BREAKFAST');

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        '/recipes?page=1&category=BREAKFAST'
      );
    });
  });
  test('updates category select value and calls replace with empty category', async () => {
    render(<CategoryFilter />);
    const select = screen.getByLabelText('Filter by Category');
    fireEvent.change(select, { target: { value: 'BREAKFAST' } });
    fireEvent.change(select, { target: { value: '' } });

    expect(select).toHaveValue('');

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/recipes?page=1');
    });
  });
});
