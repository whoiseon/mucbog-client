import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Logo from '@/assets/vectors/logo.svg';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import useDarkMode from '@/states/darkMode';
import useToggle from '@/lib/hooks/useToggle';
import MobileMenu from '@/components/base/MobileMenu';
import useBodyScrollLock from '@/lib/hooks/useBodyScrollLock';
import dynamic from 'next/dynamic';
import Button from '@/components/system/Button';
import { media } from '@/lib/media';
import useMyAccount from '@/lib/hooks/useMyAccount';
import useIsMobile from '@/lib/hooks/useIsMobile';

const MenuToggleButton = dynamic(
  () => import('@/components/system/MenuToggleButton'),
  { ssr: false },
);
const ThemeToggleButton = dynamic(
  () => import('@/components/system/ThemeToggleButton'),
  { ssr: false },
);

function Header() {
  const { data: myData } = useMyAccount();

  const [menu, toggleMenu] = useToggle(false);
  const themeInit = useDarkMode((state) => state.systemTheme !== 'not-ready');
  const [isMobile, mediaLoading] = useIsMobile();

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
            {mediaLoading &&
              (isMobile ? (
                <>
                  <MenuToggleButton isOpen={menu} onClick={toggleMenu} />
                </>
              ) : (
                <>
                  <Button variant="text" size="small" href="/">
                    개발
                  </Button>
                  <Button variant="text" size="small" href="/project">
                    프로젝트
                  </Button>
                  {myData && (
                    <Button variant="primary" size="small" href="/admin/write">
                      새 글 작성
                    </Button>
                  )}
                </>
              ))}
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
  z-index: 1;
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
    width: 82px;
    height: 30px;
  }
`;

const HeaderRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  ${media.mobile} {
    gap: 8px;
  }
`;

export default Header;
