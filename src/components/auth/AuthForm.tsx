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
import {media} from "@/lib/media";

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
    <StyledForm onSubmit={onSubmit}>
      <WelcomeText>오늘 하루도 고생많았어요 :)</WelcomeText>
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
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  padding: 16px;
  width: 100%;
  flex: 1;
  gap: 24px;
  
  ${media.mobile} {
    width: 460px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: ${themedPalette.destructive2};
`;

const WelcomeText = styled.h2`
  margin: 0;
  font-size: 16px;
  color: ${themedPalette.text1};
  text-align: center;
`;

export default AuthForm;
