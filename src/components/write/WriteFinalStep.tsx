import React from 'react';
import { SetState } from 'zustand';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function WriteFinalStep({ value, onChange }: Props) {
  return (
    <Block>
      <StyledTextArea
        value={value}
        onChange={onChange}
        placeholder="추가적인 설명을 적어주세요!"
      />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100% - 80px);
  padding: 16px;

  ${media.mobile} {
    padding: 0;
    align-items: center;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 180px;
  font-size: 16px;
  resize: none;
  background: ${themedPalette.bg_element2};
  border-radius: 6px;
  padding: 16px;
  border: 1px solid ${themedPalette.border4};
  color: ${themedPalette.text1};
  &:focus {
    outline: none;
    border: 1px solid ${themedPalette.border3};
  }
  ${media.mobile} {
    width: 360px;
  }
`;

export default WriteFinalStep;
