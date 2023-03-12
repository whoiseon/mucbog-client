import styled from '@emotion/styled';
import { PostTag } from '@/lib/api/types';
import TagCard from '@/components/system/TagCard';

interface Props {
  tags?: PostTag[];
}

function PostTags({ tags }: Props) {
  return (
    <Block>
      {tags?.map((tag) => (
        <TagCard key={tag.id} size="medium" name={tag.name} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 16px;
`;

export default PostTags;
