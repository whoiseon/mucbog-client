import React from 'react';
import { SetState } from 'zustand';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';
import { uploadImage } from '@/lib/api/image';
import LabelFile from '@/components/system/LabelFile';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  title: string;
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
}

function WriteFinalStep({
  value,
  onChange,
  title,
  setThumbnail,
  thumbnail,
}: Props) {
  const onChangeThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file, encodeURIComponent(file.name));
    try {
      const imageResponse = await uploadImage(formData);
      setThumbnail(imageResponse);
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return (
    <Block>
      <Content>
        <Title>{title}</Title>
        <LabelFile
          id="thumbnail-image"
          thumbnail={thumbnail}
          onChange={onChangeThumbnail}
        />
        <StyledTextArea
          value={value}
          onChange={onChange}
          placeholder="추가적인 설명을 적어주세요!"
        />
      </Content>
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  ${media.mobile} {
    width: 460px;
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
`;

const Title = styled.h2`
  text-align: left;
  color: ${themedPalette.text1};
`;

export default WriteFinalStep;
