'use client';
import { Instruction } from '@/lib/types';
import { CircleMinus } from 'lucide-react';
import { Dispatch, useState } from 'react';

export default function InstructionForm({
  instructions,
  setInstructions,
}: {
  instructions: Instruction[];
  setInstructions: Dispatch<React.SetStateAction<Instruction[]>>;
}) {
  const [error, setError] = useState<string | null>(null);
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index].text = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setError(null);
    if (instructions.length > 0) {
      const hasEmptyInstruction = instructions.some(
        (instruction) => instruction.text === ''
      );
      if (hasEmptyInstruction) {
        setError('Please fill in the instruction');
        return;
      }
    }
    setInstructions([
      ...instructions,
      { step: instructions.length + 1, text: '' },
    ]);
  };
  function handleRemove(index: number) {
    if (instructions.length === 1) {
      setError('You must have at least one instruction');
      return;
    }
    const newInstructions = instructions.filter((_, i) => i !== index);
    const reIndexedInstructions = newInstructions.map((instruction, i) => ({
      text: instruction.text,
      step: i + 1,
    }));
    setInstructions(reIndexedInstructions);
  }

  return (
    <div>
      <h2 className='block text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'>
        Instructions
      </h2>
      {instructions.map((instruction, index) => (
        <div key={index} className='mb-4'>
          <div className='flex space-x-4 items-center mb-2'>
            <label
              className='block  font-medium text-gray-700 dark:text-gray-200'
              htmlFor={`instruction-${index}`}
            >
              Step {instruction.step}
            </label>
            <button
              type='button'
              onClick={() => handleRemove(index)}
              aria-label={`Remove Step ${instruction.step}`}
            >
              <CircleMinus color='#f56565' size={20} />
            </button>
          </div>
          <textarea
            id={`instruction-${index}`}
            value={instruction.text}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
            className='w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-orange-400'
            rows={3}
            maxLength={200}
          ></textarea>
        </div>
      ))}
      {error && <p className='text-red-500 text-center mb-2'>{error}</p>}
      <div className='flex justify-center'>
        <button
          type='button'
          onClick={addInstruction}
          className='bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded-md'
        >
          + Instruction
        </button>
      </div>
    </div>
  );
}
