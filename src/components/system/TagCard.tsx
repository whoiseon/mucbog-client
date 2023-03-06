import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props {
  name: string;
}

function TagCard({ name }: Props) {
  return <StyledTag>{name}</StyledTag>;
}

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  color: ${themedPalette.primary1};
  background-color: ${themedPalette.bg_element3};
  border-radius: 4px;
  height: 28px;
  margin-right: 8px;
`;

export default TagCard;
