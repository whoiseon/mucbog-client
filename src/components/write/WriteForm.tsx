import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorStyle } from '@/styles/EditorStyle';
import WriteFooter from '@/components/write/WriteFooter';
import TitleInput from '@/components/write/TitleInput';
import TagForm from '@/components/write/TagForm';
import useInput from '@/lib/hooks/useInput';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import WriteFinalStep from '@/components/write/WriteFinalStep';

const Editor = dynamic(() => import('@/components/system/TuiEditor'), {
  ssr: false,
  loading: () => <EditorLoading>Loading...</EditorLoading>,
});

function WriteForm() {
  const [step, setStep] = useState<number>(1);

  const editorRef = useRef<any>(null);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState({
    text: '',
    html: '',
  });
  const [description, onChangeDescription, setDescription] = useInput('');
  const [thumbnail, setThumbnail] = useState<string>('');

  const [tagValue, setTagValue] = useState<string>('');

  const goBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const onKeyDownComma = (event: any) => {
    const {
      target: { value },
    } = event;
    if (event.code === 'Comma' || event.code === 'Enter') {
      if (tagValue === '') return;
      if (tags.includes(tagValue)) {
        toast('이미 존재하는 태그입니다!', {
          position: 'top-right',
          type: 'error',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: false,
          pauseOnHover: true,
          theme: 'colored',
        });
        setTagValue('');
        return;
      }
      setTags((prev) => [...prev, value.trim()]);
      setTagValue('');
    }
  };

  const onChangeTagValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (value === ',') return;
    setTagValue(value);
  };

  const onClickRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const onChangeBody = () => {
    const editorMarkdown = editorRef.current!.getInstance().getMarkdown();
    const editorHtml = editorRef.current!.getInstance().getHTML();
    setBody((prev) => ({
      ...prev,
      text: editorMarkdown,
      html: editorHtml,
    }));
  };

  const validInput = () => {
    if (step === 1) {
      return !title || !body.text || tags.length <= 0;
    }
    // step === 2
    return (
      !title || !body.text || tags.length <= 0 || !description || !thumbnail
    );
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorByStep =
      step === 1
        ? '제목, 내용 태그를 입력해주세요!'
        : '이미지와 추가 설명을 입력해주세요!';
    if (validInput()) {
      toast(errorByStep, {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: false,
        pauseOnHover: true,
        theme: 'colored',
      });
      return;
    }
    setStep(2);

    if (step === 2) {
      setTitle('');
      setTags([]);
      setBody((prev) => ({
        ...prev,
        text: '',
        html: '',
      }));
      setTagValue('');
      setDescription('');
      setThumbnail('');
      console.log({ title, tags, body: body.html, description, thumbnail });
    }
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      {step === 1 && (
        <>
          <TitleInput
            type="text"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요"
          />
          <TagForm
            tags={tags}
            value={tagValue}
            onChange={onChangeTagValue}
            onKeyDown={onKeyDownComma}
            onRemove={onClickRemoveTag}
          />
          <Editor
            onChange={onChangeBody}
            content={body.text}
            editorRef={editorRef}
          />
        </>
      )}
      {step === 2 && (
        <WriteFinalStep
          title={title}
          setThumbnail={setThumbnail}
          value={description}
          onChange={onChangeDescription}
          thumbnail={thumbnail}
        />
      )}
      <WriteFooter step={step} goBackStep={goBackStep} />
      <ToastContainer limit={1} />
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
