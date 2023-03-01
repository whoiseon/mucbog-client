import React from 'react';
import styled from '@emotion/styled';
import Logo from '@/assets/vectors/logo.svg';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import ThemeToggleButton from '@/components/system/ThemeToggleButton';
import useDarkMode from '@/states/darkMode';
import useToggle from '@/lib/hooks/useToggle';
import MenuToggleButton from '@/components/system/MenuToggleButton';

function Header() {
  const [menu, toggleMenu] = useToggle(false);
  const themeInit = useDarkMode((state) => state.systemTheme !== 'not-ready');

  return (
    <Block>
      <Title href="/">
        <Logo />
      </Title>
      <HeaderRight>
        {themeInit && <ThemeToggleButton />}
        <MenuToggleButton isOpen={menu} onClick={toggleMenu} />
      </HeaderRight>
    </Block>
  );
}

const Block = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: saturate(180%) blur(5px);
`;

const Title = styled(Link)`
  svg {
    color: ${themedPalette.text1};
    width: 80px;
    height: 28px;
  }
`;

const HeaderRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export default Header;
