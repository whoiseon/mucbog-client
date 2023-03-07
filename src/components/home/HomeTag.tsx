import { Tag } from '@/lib/api/types';
import styled from '@emotion/styled';
import Link from 'next/link';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  tag: Tag;
}

function HomeTag({ tag }: Props) {
  const { query } = useRouter();
  const isActive = query.tag === tag.tag_name;
  return (
    <StyledLink
      style={
        isActive
          ? {
              backgroundColor: themedPalette.bg_element3,
              color: themedPalette.primary2,
            }
          : {}
      }
      href={`?tag=${tag.tag_name}`}
    >
      {tag.tag_name}
      <PostCount>({tag.post_count})</PostCount>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  padding: 6px 16px;
  border-radius: 6px;
  &:hover {
    color: ${themedPalette.primary2};
    background-color: ${themedPalette.bg_element3};
  }
  ${media.tablet} {
    width: 100%;
    margin-left: -16px;
  }
`;

const PostCount = styled.span`
  color: ${themedPalette.text3};
  margin-left: 4px;
`;

export default HomeTag;
