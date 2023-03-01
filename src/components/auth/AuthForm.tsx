import styled from '@emotion/styled';
import LabelInput from '@/components/system/LabelInput';
import Button from '@/components/system/Button';
import useInput from '@/lib/hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo, useState } from 'react';
import { login } from '@/lib/api/auth';
import { themedPalette } from '@/styles/palette';
import { extractError } from '@/lib/error';
import { useRouter } from 'next/router';

function AuthForm() {
  const router = useRouter();

  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');

  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState('');

  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    onMutate: () => {
      setLoginError('');
    },
    onSuccess: () => {
      queryClient.refetchQueries(['me']);
      router.push('/');
    },
    onError: (e: any) => {
      const error = extractError(e);
      setLoginError(error.message);
    },
  });

  const handleToTranslateError = useMemo(() => {
    switch (loginError) {
      case 'UsernameOrPasswordEmpty':
        return '아이디와 비밀번호를 입력해주세요.';
      case 'AuthenticationError':
        return '잘못된 계정 정보입니다.';
    }
  }, [loginError]);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!username || !password) {
        setLoginError('UsernameOrPasswordEmpty');
        return;
      }
      mutate({ username, password });
    },
    [mutate, username, password],
  );

  return (
    <Block onSubmit={onSubmit}>
      <InputGroup>
        <LabelInput
          type="text"
          label="아이디"
          value={username}
          onChange={onChangeUsername}
          disabled={isLoading}
        />
        <LabelInput
          type="password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          disabled={isLoading}
        />
      </InputGroup>
      <ActionBox>
        {loginError && <ErrorMessage>{handleToTranslateError}</ErrorMessage>}
        <Button type="submit" layout="fullWidth" disabled={isLoading}>
          로그인
        </Button>
      </ActionBox>
    </Block>
  );
}

const Block = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-left: 16px;
  padding-right: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ErrorMessage = styled.p`
  color: ${themedPalette.destructive2};
`;

export default AuthForm;
