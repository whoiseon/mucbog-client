import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyAccount, logout } from '@/lib/api/auth';
import Button from '@/components/system/Button';
import { useCallback } from 'react';

const menuItemsMap = [
  { name: 'Home.', href: '/' },
  { name: 'About.', href: '/about' },
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

const Block = styled.nav`
  position: absolute;
  top: 60px;
  left: 0;
  background: ${themedPalette.bg_page};
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const MenuGroup = styled.ul``;

const MenuItem = styled.li`
  a {
    display: flex;
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  button {
    margin-top: 12px;
  }
`;

export default MobileMenu;
