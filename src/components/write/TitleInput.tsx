import styled from '@emotion/styled';
import React from 'react';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function TitleInput(props: Props) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 0;
  background-color: ${themedPalette.bg_page};
  border: none;
  color: ${themedPalette.text1};
  font-size: 28px;
  font-weight: 600;
  padding-left: 16px;
  padding-right: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: 'Pretendard', sans-serif;
    color: ${themedPalette.text4};
    font-weight: 600;
  }

  ${media.mobile} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export default TitleInput;
