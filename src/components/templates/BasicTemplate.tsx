import React from 'react';
import styled from '@emotion/styled';
import Header from '@/components/base/Header';

interface Props {
  children: React.ReactNode;
  className?: string;
  headerLeft?: React.ReactNode;
  desktopHeaderVisible?: boolean;
}

function BasicTemplate({ children, className, desktopHeaderVisible = true }: Props) {
  return (
    <>
      {desktopHeaderVisible && <Header />}
      <Content className={className}>{children}</Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
`;

export default BasicTemplate;
