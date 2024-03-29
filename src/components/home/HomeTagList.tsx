import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '@/lib/api/tag';
import styled from '@emotion/styled';
import { Tag } from '@/lib/api/types';
import HomeTag from '@/components/home/HomeTag';
import { media } from '@/lib/media';
import useIsTablet from '@/lib/hooks/useIsTablet';

interface Props {
  totalPost?: number;
}

function HomeTagList({ totalPost }: Props) {
  const [isTablet, mediaLoading] = useIsTablet();

  const { data: tagData, isLoading } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getAllTags,
  });

  return !isLoading ? (
    <List>
      {mediaLoading && (!isTablet ? <h3>태그</h3> : undefined)}
      <HomeTag totalPost={totalPost} />
      {tagData?.map((t) => (
        <HomeTag key={t.tag_id} tag={t} />
      ))}
    </List>
  ) : (
    <List>로딩중..</List>
  );
}

const List = styled.aside`
  display: flex;
  align-items: center;
  margin-left: -8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${media.tablet} {
    position: sticky;
    top: 76px;
    margin-left: 0;
    flex-direction: column;
    align-items: inherit;
    width: 200px;
    overflow-x: inherit;
  }
`;

export default HomeTagList;
