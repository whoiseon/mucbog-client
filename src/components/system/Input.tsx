import React, { memo } from 'react';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
  if (props.type === 'file') {
    return <StyledFileInput {...props} />;
  }
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  background-color: ${themedPalette.bg_element2};
  border: none;
  height: 42px;
  border-radius: 6px;
  transition: all 0.125s ease-in-out;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  padding-left: 16px;
  padding-right: 16px;
  color: ${themedPalette.text1};

  &:hover,
  :focus {
    background-color: ${themedPalette.bg_element1};
    border: 1px solid ${themedPalette.primary2};
    box-shadow: 0 0 0 4px ${themedPalette.border3};
  }

  &::placeholder {
    color: ${themedPalette.text4};
  }

  &:disabled {
    opacity: 0.3;
    &:hover,
    :focus {
      background-color: ${themedPalette.bg_element1};
      border: none;
      box-shadow: none;
    }
  }
`;

const StyledFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export default memo(Input);
