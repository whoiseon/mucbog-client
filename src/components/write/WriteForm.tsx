import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorStyle } from '@/styles/EditorStyle';
import WriteFooter from '@/components/write/WriteFooter';
import TitleInput from '@/components/write/TitleInput';
import TagForm from '@/components/write/TagForm';

const Editor = dynamic(() => import('@/components/system/TuiEditor'), {
  ssr: false,
  loading: () => <EditorLoading>Loading...</EditorLoading>,
});

function WriteForm() {
  const editorRef = useRef<any>(null);

  return (
    <StyledForm>
      <TitleInput type="text" placeholder="제목을 입력해주세요" />
      <TagForm />
      <Editor content=" " editorRef={editorRef} />
      <WriteFooter />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  ${EditorStyle}
`;

const EditorLoading = styled.div`
  width: 100%;
  height: calc(100% - 100px);
`;

export default WriteForm;
