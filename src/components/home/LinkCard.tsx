import { Post } from '@/lib/api/types';
import styled from '@emotion/styled';
import Link from 'next/link';
import { media } from '@/lib/media';
import { themedPalette } from '@/styles/palette';
import moment from 'moment';

import 'moment/locale/ko';

interface Props {
  post: Post;
}

function LinkCard({ post }: Props) {
  return (
    <Block>
      <StyledLink href="/">
        {post.thumbnail && <Thumbnail src={post.thumbnail} alt={post.title} />}
        <PostInfo>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{moment(post.createdAt).locale('ko').fromNow()}</p>
        </PostInfo>
      </StyledLink>
    </Block>
  );
}

const Block = styled.article`
  display: flex;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.5;
    color: ${themedPalette.text1};
  }
  p {
    margin-top: 16px;
    margin-bottom: 0;
    color: ${themedPalette.text2};
    &:last-of-type {
      margin-top: 8px;
      color: ${themedPalette.text4};
      ${media.tablet} {
        margin-top: 32px;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  ${media.tablet} {
    flex-direction: row;
    align-items: center;
    gap: 40px;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1200/630;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 3 rgb(0 0 0 / 15%);
  display: block;
  margin-bottom: 16px;
  ${media.tablet} {
    width: 240px;
    height: 200px;
    margin-bottom: 0;
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${themedPalette.text1};
`;

export default LinkCard;
