import styled from '@emotion/styled';
import { media } from '@/lib/media';

interface Props {
  title: string | string[];
}

function HeaderText({ title }: Props) {
  return <StyledText>{title}</StyledText>;
}

const StyledText = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  padding: 20px 0;
  margin: 18px 0;
  ${media.mobile} {
    margin: 48px 0 32px;
    font-size: 32px;
  }
`;

export default HeaderText;
