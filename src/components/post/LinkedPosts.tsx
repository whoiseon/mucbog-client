import styled from '@emotion/styled';
import Link from 'next/link';
import { router } from 'next/client';
import { useRouter } from 'next/router';
import generateSlug from '@/lib/generate-slug';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';

interface Props {
  prevPost?: string;
  nextPost?: string;
}

function LinkedPosts({ prevPost, nextPost }: Props) {
  const router = useRouter();
  return (
    <Block>
      {prevPost ? (
        <Card position="left">
          <Link
            href={`/${router.query.category}/${generateSlug(
              prevPost as string,
            )}`}
          >
            <p>이전 포스트</p>
            <h3>{prevPost}</h3>
          </Link>
        </Card>
      ) : (
        <EmptyCard />
      )}
      {nextPost ? (
        <Card position="right">
          <Link
            href={`/${router.query.category}/${generateSlug(
              nextPost as string,
            )}`}
          >
            <p>다음 포스트</p>
            <h3>{nextPost}</h3>
          </Link>
        </Card>
      ) : (
        <EmptyCard />
      )}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  gap: 16px;
  ${media.tablet} {
    flex-direction: row;
    gap: 48px;
  }
`;

const Card = styled.div<{ position: 'left' | 'right' }>`
  color: ${themedPalette.text1};
  flex: 1 1 0%;
  min-width: 0px;
  padding: 12px 16px;
  background-color: ${themedPalette.bg_element3};
  border-radius: 4px;
  transition: transform 0.16s ease-in-out;
  a {
    &:hover {
      text-decoration: none;
    }
  }
  p {
    color: ${themedPalette.text3};
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    ${(props) =>
      props.position === 'left' ? 'text-align: left' : 'text-align: right'}
  }
  h3 {
    padding: 0;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 18px;
    color: ${themedPalette.text1};
    font-weight: 600;
    ${(props) =>
      props.position === 'left' ? 'text-align: left' : 'text-align: right'}
  }

  ${media.tablet} {
    &:hover {
      transform: translateX(
        ${(props) => (props.position === 'left' ? '-4' : '4')}px
      );
    }
  }
`;

const EmptyCard = styled.div`
  flex: 1 1 0%;
  min-width: 0px;
`;

export default LinkedPosts;
