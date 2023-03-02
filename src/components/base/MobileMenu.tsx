import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyAccount, logout } from '@/lib/api/auth';
import Button from '@/components/system/Button';
import { useCallback } from 'react';
import {keyframes} from "@emotion/react";

const menuItemsMap = [
  { name: '개발', href: '/' },
  { name: '프로젝트', href: '/about' },
];

function MobileMenu() {
  const queryClient = useQueryClient();

  const { data: myData } = useQuery({
    queryKey: ['me'],
    queryFn: getMyAccount,
  });

  const useLogout = useMutation({
    mutationFn: logout,
    onMutate: () => {},
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
      window.location.href = '/';
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onLogout = useCallback(() => {
    useLogout.mutate();
  }, [useLogout]);

  return (
    <Block>
      <MenuGroup>
        {menuItemsMap.map((item) => (
          <MenuItem key={item.name}>
            <Link href={item.href}>{item.name}</Link>
          </MenuItem>
        ))}
      </MenuGroup>
      <MenuGroup>
        {myData && (
          <MenuItem>
            <Button layout="fullWidth" variant="text" onClick={onLogout}>
              로그아웃
            </Button>
          </MenuItem>
        )}
      </MenuGroup>
    </Block>
  );
}

const MenuShowAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Block = styled.nav`
  position: absolute;
  top: 60px;
  left: 0;
  background: ${themedPalette.bg_page};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${MenuShowAnimation} 0.3s ease-in-out;
`;

const MenuGroup = styled.ul`
  padding-right: 16px;
  padding-left: 16px;
  margin-top: 16px;
`;

const MenuItem = styled.li`
  a {
    display: flex;
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 18px;
    font-weight: 700;
    color: ${themedPalette.text2};
  }
  button {
    font-size: 18px;
  }
  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export default MobileMenu;
