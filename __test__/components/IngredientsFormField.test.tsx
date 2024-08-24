import { test, describe, vi, expect } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import IngredientsFormField from '@/components/IngredientsFormField';
import { Ingredient } from '@/lib/types';
import { init } from 'aos';
import exp from 'constants';

describe('IngredientsFormField', () => {
  const initialIngredients: Ingredient[] = [
    { name: 'Sugar', quantity: '1 cup' },
  ];
  const setIngredients = vi.fn();

  test('renders the initial ingredients', () => {
    render(
      <IngredientsFormField
        ingredients={initialIngredients}
        setIngredients={setIngredients}
      />
    );
    expect(screen.getByDisplayValue('Sugar')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1 cup')).toBeInTheDocument();
  });

  test('updates an ingredient name', () => {
    render(
      <IngredientsFormField
        ingredients={initialIngredients}
        setIngredients={setIngredients}
      />
    );
    fireEvent.change(screen.getByDisplayValue('Sugar'), {
      target: { value: 'Salt' },
    });
    expect(setIngredients).toHaveBeenCalledWith([
      { name: 'Salt', quantity: '1 cup' },
    ]);
  });
  
  test('adds a new ingredient', () => {
    render(
      <IngredientsFormField
        ingredients={initialIngredients}
        setIngredients={setIngredients}
      />
    );

    fireEvent.click(screen.getByText('+ Ingredient'));
    expect(setIngredients).toHaveBeenCalledWith([
      ...initialIngredients,
      { name: '', quantity: '' },
    ]);
  });

  test('shows an error when trying to add an empty ingredient', () => {
    render(
      <IngredientsFormField
        ingredients={[{ name: '', quantity: '' }]}
        setIngredients={setIngredients}
      />
    );
    fireEvent.click(screen.getByText('+ Ingredient'));
    expect(
      screen.getByText('Please fill in the ingredient name and quantity')
    ).toBeInTheDocument();
  });

  test('shows an error when trying to remove the last ingredient', () => {
    render(
      <IngredientsFormField
        ingredients={initialIngredients}
        setIngredients={setIngredients}
      />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Ingredient 1' })
    );
    expect(
      screen.getByText('You must have at least one ingredient')
    ).toBeInTheDocument();
  });
});
