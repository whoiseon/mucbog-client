import { PostTag } from '@/lib/api/types';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import moment from 'moment/moment';
import PostTags from '@/components/post/PostTags';
import useMyAccount from '@/lib/hooks/useMyAccount';
import postState from '@/states/post';
import useDeletePost from '@/lib/hooks/useDeletePost';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { media } from '@/lib/media';

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
  console.log(router.query);
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
            <PostButtons>
              <button className="delete" type="button" onClick={onDelete}>
                삭제하기
              </button>
              <Link
                className="update"
                href={`/${router.query.category}/${router.query.post_title}/update`}
              >
                수정하기
              </Link>
            </PostButtons>
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
  flex-direction: column;

  .left {
  }

  .right {
    margin-top: 16px;

    ${media.mobile} {
      min-width: 240px;
    }
  }

  ${media.mobile} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PostButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  button,
  a {
    font-size: 14px;
    font-weight: 700;
    border: none;
    background: none;
    border-radius: 6px;
    padding: 4px 12px;
    cursor: pointer;
    &.delete {
      color: ${themedPalette.destructive2};
      border: 1.6px solid ${themedPalette.destructive2};
      &:hover {
        background-color: ${themedPalette.destructive2};
        color: ${themedPalette.button_text};
      }
    }
    &.update {
      color: ${themedPalette.primary2};
      border: 1.6px solid ${themedPalette.primary2};
      &:hover {
        background-color: ${themedPalette.primary2};
        color: ${themedPalette.button_text};
      }
    }
  }
`;

const Separator = styled.span`
  margin: 0 8px;
`;

export default PostHead;
