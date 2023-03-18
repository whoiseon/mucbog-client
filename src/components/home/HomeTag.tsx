import { Tag } from '@/lib/api/types';
import styled from '@emotion/styled';
import Link from 'next/link';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';
import { useRouter } from 'next/router';
import React from 'react';
import useIsTablet from '@/lib/hooks/useIsTablet';
import { css } from '@emotion/react';

interface Props {
  tag?: Tag;
  totalPost?: number;
}

function HomeTag({ tag, totalPost }: Props) {
  const router = useRouter();
  const [isTablet, mediaLoading] = useIsTablet();
  const isActive = router.query.tag === tag?.tag_name;
  return (
    <Block isActive={isActive} isTablet={isTablet}>
      {totalPost ? (
        <>
          <StyledLink href="/">전체보기</StyledLink>
        </>
      ) : (
        <>
          <StyledLink href={`/tag/${tag?.tag_name}`}>
            {tag?.tag_name}
          </StyledLink>
        </>
      )}
    </Block>
  );
}

const Block = styled.div<{ isActive: boolean; isTablet: boolean }>`
  padding: 10px 12px;
  border-radius: 6px;
  white-space: nowrap;
  ${media.tablet} {
    padding: 4px 0;
  }

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${themedPalette.bg_element3};
      a {
        font-weight: 700;
        color: ${themedPalette.primary2};
      }
    `}
  ${(props) => !props.isTablet && `background: none`}
`;

const StyledLink = styled(Link)`
  border-radius: 6px;
  ${media.tablet} {
    width: 100%;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default HomeTag;
