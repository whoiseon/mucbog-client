import React from 'react';
import styled from '@emotion/styled';
import Header from '@/components/base/Header';

interface Props {
  children: React.ReactNode;
  className?: string;
  headerLeft?: React.ReactNode;
  desktopHeaderVisible?: boolean;
  header?: React.ReactNode;
}

function BasicTemplate({
  header = <Header />,
  children,
  className,
  desktopHeaderVisible = true,
}: Props) {
  return (
    <>
      <Content className={className}>
        {desktopHeaderVisible && header}
        {children}
      </Content>
    </>
  );
}

const Content = styled.main`
  height: 100%;
`;

const HeaderText = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  padding: 20px 0;
  margin: 48px 0 32px;
`;

export default BasicTemplate;
