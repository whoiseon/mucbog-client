import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '@/lib/api/tag';
import styled from '@emotion/styled';
import { Tag } from '@/lib/api/types';
import HomeTag from '@/components/home/HomeTag';

function HomeTagList() {
  const { data: tagData } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getAllTags,
  });

  return (
    <List>
      <h3>태그</h3>
      {tagData?.map((t) => (
        <HomeTag key={t.tag_id} tag={t} />
      ))}
    </List>
  );
}

const List = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 200px;
`;

export default HomeTagList;
