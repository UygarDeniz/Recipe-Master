import { z } from 'zod';
const IngredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  quantity: z.string().min(1, 'Ingredient quantity is required'),
});

const InstructionSchema = z.object({
  step: z.number().min(1, 'Step number must be at least 1'),
  text: z.string().min(1, 'Instruction text is required'),
});

export const RecipeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(27, 'Title is too long'),
  description: z
    .string()
    .min(10, 'Description should be at least 10 characters long'),
  category: z.enum([
    'BREAKFAST',
    'LUNCH',
    'DINNER',
    'DESSERT',
    'SNACK',
    'OTHER',
    'DRINK',
  ]),
  ingredients: z
    .array(IngredientSchema)
    .min(1, 'At least one ingredient is required'),
  instructions: z
    .array(InstructionSchema)
    .min(1, 'At least one instruction is required'),
});
