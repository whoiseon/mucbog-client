import { useQuery } from '@tanstack/react-query';
import { getDevRecentPosts, getPostsByTag } from '@/lib/api/post';
import styled from '@emotion/styled';
import LinkCard from '@/components/home/LinkCard';
import { Post } from '@/lib/api/types';
import { useRouter } from 'next/router';

function LinkCardList() {
  const router = useRouter();
  const { data: postData } = useQuery<Post[]>({
    queryKey: router.query.tag ? ['posts', router.query.tag] : ['posts'],
    queryFn: router.query.tag
      ? () => getPostsByTag(router.query.tag as string)
      : getDevRecentPosts,
  });
  return (
    <List>
      {postData?.map((post) => (
        <LinkCard key={post.id} post={post} />
      ))}
    </List>
  );
}

const List = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 40px;
`;

export default LinkCardList;
