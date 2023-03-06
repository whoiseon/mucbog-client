import { useQuery } from '@tanstack/react-query';
import { getDevPosts } from '@/lib/api/post';
import styled from '@emotion/styled';
import LinkCard from '@/components/home/LinkCard';
import { Post } from '@/lib/api/types';

function LinkCardList() {
  const { data: postData } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getDevPosts,
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
