import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import useGoBack from '@/lib/hooks/useGoBack';
import Button from '@/components/system/Button';
import BackArrowIcon from '@/assets/vectors/back-arrow.svg';
import React, { useCallback } from 'react';

interface Props {
  step: number;
  goBackStep: () => void;
}

function WriteFooter({ step, goBackStep }: Props) {
  const goBack = useGoBack();
  const backStep = useCallback(() => {}, []);
  return (
    <Block>
      <FooterSide>
        <Button
          type="button"
          variant="text"
          onClick={step === 1 ? goBack : goBackStep}
        >
          <BackArrowIcon />
          {step === 1 ? '나가기' : '뒤로가기'}
        </Button>
      </FooterSide>
      <FooterSide>
        <Button type="submit" variant="primary">
          작성하기
        </Button>
      </FooterSide>
    </Block>
  );
}

const Block = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  flex: 1;
  background-color: ${themedPalette.bg_element2};
  padding-left: 16px;
  padding-right: 16px;
`;

const FooterSide = styled.div``;

export default WriteFooter;
