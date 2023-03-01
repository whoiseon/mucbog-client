import React from 'react';
import styled from '@emotion/styled';
import Header from '@/components/base/Header';

interface Props {
  children: React.ReactNode;
  className?: string;
  headerLeft?: React.ReactNode;
}

function BasicTemplate({ children, className }: Props) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

const Content = styled.div`
  height: 100%;
`;

export default BasicTemplate;
