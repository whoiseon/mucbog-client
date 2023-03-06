import { Tag } from '@/lib/api/types';
import styled from '@emotion/styled';
import Link from 'next/link';
import { themedPalette } from '@/styles/palette';

interface Props {
  tag: Tag;
}

function HomeTag({ tag }: Props) {
  return (
    <StyledLink href="/">
      {tag.tag_name} ({tag.post_count})
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  width: 100%;
  padding: 8px 16px;
  margin-left: -16px;
  border-radius: 6px;
  &:hover {
    text-decoration: underline;
    color: ${themedPalette.primary2};
    background-color: ${themedPalette.bg_element3};
  }
`;

export default HomeTag;
