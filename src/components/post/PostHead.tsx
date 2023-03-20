import { PostTag } from '@/lib/api/types';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import moment from 'moment/moment';
import PostTags from '@/components/post/PostTags';
import useMyAccount from '@/lib/hooks/useMyAccount';
import postState from '@/states/post';
import useDeletePost from '@/lib/hooks/useDeletePost';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  createdAt?: Date;
  tags?: PostTag[];
}

function PostHead({ title, createdAt, tags }: Props) {
  const router = useRouter();
  const { data: myData } = useMyAccount();
  const { id: postId } = postState();

  const mutateDeletePost = useDeletePost(
    postId as number,
    router.query.category,
    router.query.post_title,
  );

  const onDelete = () => {
    mutateDeletePost();
  };

  return (
    <Block>
      <h1>{title}</h1>
      <Info>
        <div className="left">
          <span className="username">MUCBOG</span>
          <Separator>·</Separator>
          <span>{moment(createdAt).format('YYYY년 M월 DD일')}</span>
        </div>
        {myData && (
          <div className="right">
            <button type="button" onClick={onDelete}>
              삭제
            </button>
          </div>
        )}
      </Info>
      <PostTags tags={tags} />
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

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    min-width: 240px;

    button {
      font-size: 16px;
      background: none;
      border: none;
      color: ${themedPalette.text3};
      cursor: pointer;
    }
  }
`;

const Separator = styled.span`
  margin: 0 8px;
`;

export default PostHead;
