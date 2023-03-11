import { Post } from '@/lib/api/types';
import styled from '@emotion/styled';
import Link from 'next/link';
import { media } from '@/lib/media';
import { themedPalette } from '@/styles/palette';
import moment from 'moment';

import 'moment/locale/ko';
import TagCard from '@/components/system/TagCard';
import generateSlug from '@/lib/generate-slug';
import translateCategory from '@/lib/translate-category';

interface Props {
  post: Post;
}

function LinkCard({ post }: Props) {
  return (
    <Block>
      <StyledLink
        href={`/${translateCategory(post.category.name)}/${generateSlug(
          post.title,
        )}`}
      >
        {post.thumbnail && <Thumbnail src={post.thumbnail} alt={post.title} />}
        <PostInfo>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>{moment(post.createdAt).locale('ko').fromNow()}</p>
          <TagGroup>
            {post.tags.map((tag) => (
              <TagCard key={tag.id} name={tag.name} />
            ))}
          </TagGroup>
        </PostInfo>
      </StyledLink>
    </Block>
  );
}

const Block = styled.article`
  display: flex;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.5;
    color: ${themedPalette.text1};
    ${media.tablet} {
      font-size: 28px;
      max-width: 480px;
    }
  }
  p {
    margin-top: 16px;
    margin-bottom: 0;
    color: ${themedPalette.text2};
    &:last-of-type {
      margin-top: 32px;
      color: ${themedPalette.text4};
      ${media.tablet} {
        margin-top: 32px;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${media.tablet} {
    flex-direction: row;
    align-items: center;
    gap: 40px;
    &:hover {
      img {
        transform: scale(1.03);
      }
    }
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
  transition: all 0.125s ease-in-out;
  ${media.tablet} {
    width: 240px;
    height: 200px;
    margin-bottom: 0;
  }
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${themedPalette.text1};
`;

const TagGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

export default LinkCard;
