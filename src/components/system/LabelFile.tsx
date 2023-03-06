import React from 'react';
import styled from '@emotion/styled';
import Input, { InputProps } from '@/components/system/Input';
import Image from 'next/image';
import { media } from '@/lib/media';
import { themedPalette } from '@/styles/palette';

interface Props extends InputProps {
  thumbnail: string;
}

function LabelFile({ thumbnail, ...rest }: Props) {
  return (
    <Block>
      <label htmlFor="thumbnail-image">
        {thumbnail ? (
          <Image src={thumbnail} alt="thumbnail_preview" fill sizes="100vw" />
        ) : (
          <NoImage>썸네일 이미지를 업로드해주세요.</NoImage>
        )}
      </label>
      <Input type="file" {...rest} />
    </Block>
  );
}

const Block = styled.div`
  label {
    display: block;
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid ${themedPalette.border4};
  }
  img {
    object-fit: cover;
  }
`;

const NoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themedPalette.bg_page};
  height: 100%;
  font-weight: 700;
`;

export default LabelFile;
