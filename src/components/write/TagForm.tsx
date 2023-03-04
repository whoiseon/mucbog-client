import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';
import React, { useState } from 'react';
import Tag from '@/components/system/Tag';

function TagForm() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>('');

  const onKeypressComma = (event: any) => {
    if (event.code === 'Comma') {
      if (tagValue === '') return;
      setTags((prev) => [...prev, event.target.value]);
      setTagValue('');
    }
  };

  const onChangeTagValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === ',') return;
    setTagValue(event.target.value);
  };

  const onClickRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <Block>
      {tags.length > 0 && (
        <TagGroup>
          {tags.map((tag) => (
            <Tag key={tag} name={tag} remove={onClickRemoveTag} />
          ))}
        </TagGroup>
      )}
      <TagInput
        type="text"
        placeholder="태그를 입력해주세요"
        onKeyPress={onKeypressComma}
        value={tagValue}
        onChange={onChangeTagValue}
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
