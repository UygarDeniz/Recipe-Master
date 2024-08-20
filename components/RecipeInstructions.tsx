import { Instruction } from '@prisma/client';

interface RecipeInstructionsProps {
  instructions: Instruction[];
}

function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  return (
    <div className='col-span-2 md:ml-10'>
      <h2 className='font-bold text-2xl mb-4 text-gray-600 dark:text-gray-300'>
        INSTRUCTIONS
      </h2>
      <ol className='list-decimal list-inside space-y-6 text-gray-500 dark:text-gray-400 leading-relaxed font-medium text-lg'>
        {instructions.map((instruction) => (
          <li key={instruction.id}>{instruction.text}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeInstructions;
