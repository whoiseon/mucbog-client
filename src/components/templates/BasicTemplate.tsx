import React from 'react';
import styled from '@emotion/styled';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import { media } from '@/lib/media';

interface Props {
  children: React.ReactNode;
  className?: string;
  headerLeft?: React.ReactNode;
  desktopHeaderVisible?: boolean;
  header?: React.ReactNode;
  layout?: 'full' | 'normal';
}

function BasicTemplate({
  header = <Header />,
  children,
  className,
  desktopHeaderVisible = true,
  layout = 'normal',
}: Props) {
  return (
    <>
      {desktopHeaderVisible && header}
      <Content className={className}>{children}</Content>
      <Footer />
    </>
  );
}

const Content = styled.main`
  padding-bottom: 48px;
  ${media.mobile} {
    padding-bottom: 64px;
  }
`;

export default BasicTemplate;
