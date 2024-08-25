import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { likeRecipe } from '@/actions/like';
type LikeButtonProps = {
  likes: number;
  hasLiked: boolean;
  userId: string;
  recipeId: string;
};
function LikeButton({ likes, hasLiked, userId, recipeId }: LikeButtonProps) {
  const likeRecipeWithInformation = likeRecipe.bind(null, recipeId, userId);

  return (
    <form
      action={likeRecipeWithInformation}
      className='flex items-center gap-1 hover:text-red-500 hover:underline'
    >
      <button
        className={cn(
          'flex items-center transition-colors duration-200 ',
          hasLiked && 'text-red-500'
        )}
      >
        <Heart className='w-6 h-6' fill={hasLiked ? '#ef4444' : 'white'} />
      </button>
      <span>{likes}</span>
    </form>
  );
}

export default LikeButton;
