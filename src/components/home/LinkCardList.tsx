import styled from '@emotion/styled';
import LinkCard from '@/components/home/LinkCard';
import { PostBody } from '@/lib/api/types';
import Pagination from '@/components/system/Pagination';

interface Props {
  postData?: PostBody;
  totalPage?: number;
  page: number;
}

function LinkCardList({ postData, totalPage, page }: Props) {
  const isNoPage = postData && postData?.totalPost <= postData?.limit;
  return (
    <List>
      {postData?.posts.map((post) => (
        <LinkCard key={post.id} post={post} />
      ))}
      {!isNoPage && (
        <Pagination totalPage={totalPage} limit={postData?.limit} page={page} />
      )}
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
