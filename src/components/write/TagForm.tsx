import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';
import React, { useState } from 'react';
import Tag from '@/components/system/Tag';

interface Props {
  value: string;
  tags: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: any) => void;
  onRemove: (tag: string) => void;
}

function TagForm({ value, tags, onKeyDown, onChange, onRemove }: Props) {
  return (
    <Block>
      {tags.length > 0 && (
        <TagGroup>
          {tags.map((tag) => (
            <Tag key={tag} name={tag} remove={onRemove} />
          ))}
        </TagGroup>
      )}
      <TagInput
        type="text"
        placeholder="태그를 입력해주세요"
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
      />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagInput = styled.input`
  font-size: 16px;
  border-radius: 0;
  border: none;
  height: 40px;
  color: ${themedPalette.text1};
  background: none;
  padding-left: 16px;
  padding-right: 16px;

  &:focus {
    outline: none;
  }

  ${media.mobile} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const TagGroup = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  margin: 8px 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.mobile} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export default TagForm;
