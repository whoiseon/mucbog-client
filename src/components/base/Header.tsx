import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Logo from '@/assets/vectors/logo.svg';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import ThemeToggleButton from '@/components/system/ThemeToggleButton';
import useDarkMode from '@/states/darkMode';
import useToggle from '@/lib/hooks/useToggle';
import MenuToggleButton from '@/components/system/MenuToggleButton';
import MobileMenu from '@/components/base/MobileMenu';
import useBodyScrollLock from '@/lib/hooks/useBodyScrollLock';

function Header() {
  const [menu, toggleMenu] = useToggle(false);
  const themeInit = useDarkMode((state) => state.systemTheme !== 'not-ready');

  useBodyScrollLock(menu);

  return (
    <>
      <Block>
        <Inner>
          <Title href="/">
            <Logo />
          </Title>
          <HeaderRight>
            {themeInit && <ThemeToggleButton />}
            <MenuToggleButton isOpen={menu} onClick={toggleMenu} />
          </HeaderRight>
        </Inner>
      </Block>
      {menu && <MobileMenu />}
    </>
  );
}

const Block = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  backdrop-filter: saturate(180%) blur(5px);
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  max-width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
`;

const Title = styled(Link)`
  svg {
    color: ${themedPalette.text1};
    width: 76px;
    height: 24px;
  }
`;

const HeaderRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export default Header;
