import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const globalFullHeight = css`
  html,
  body,
  #__next {
    height: 100%;
  }
`;

interface Props {
  children: React.ReactNode;
}

function FullHeightPage({ children }: Props) {
  return (
    <>
      <Global styles={globalFullHeight} />
      <Page>{children}</Page>
    </>
  );
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default FullHeightPage;
