import { PostTag } from '@/lib/api/types';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import moment from 'moment/moment';
import TagCard from '@/components/system/TagCard';
import PostTags from '@/components/post/PostTags';

interface Props {
  title?: string;
  createdAt?: Date;
  tags?: PostTag[];
}

function PostHead({ title, createdAt, tags }: Props) {
  return (
    <Block>
      <h1>{title}</h1>
      <Info>
        <span className="username">MUCBOG</span>
        <Separator>·</Separator>
        <span>{moment(createdAt).format('YYYY년 M월 DD일')}</span>
        <PostTags tags={tags} />
      </Info>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 36px;
    margin: 0 0 32px;
  }
  .username {
    font-size: 16px;
    font-weight: 700;
    color: ${themedPalette.text1};
  }
  span {
    color: ${themedPalette.text3};
    font-weight: 400;
  }
`;

const Info = styled.div``;

const Separator = styled.span`
  margin: 0 8px;
`;

const TagList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 16px;
`;

export default PostHead;
