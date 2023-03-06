import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { keyframes } from '@emotion/react';

interface Props {
  name: string;
  remove: (tag: string) => void;
}

function WriteTag({ name, remove }: Props) {
  return <StyledTag onClick={() => remove(name)}>{name}</StyledTag>;
}

const ShowTagAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  color: ${themedPalette.primary1};
  background-color: ${themedPalette.bg_element3};
  border-radius: 4px;
  height: 32px;
  margin-right: 8px;
  cursor: pointer;
  animation: ${ShowTagAnimation} 0.2s ease-in-out;
`;

export default WriteTag;
