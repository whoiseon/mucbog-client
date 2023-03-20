import { deletePost } from '@/lib/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useDeletePost(
  postId: number,
  category?: string | string[],
  postTitle?: string | string[],
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.removeQueries(['posts', category, postTitle]);
      queryClient.invalidateQueries(['posts']);
      router.push('/');
    },
    onError: (e: any) => {
      console.log(e);
    },
  });

  return mutate;
}
