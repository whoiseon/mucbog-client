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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPosts, updatePosts } from '@/lib/api/post';
import { useRouter } from 'next/router';
import EmptyPage from '@/components/system/EmptyPage';
import { Post } from '@/lib/api/types';

const Editor = dynamic(() => import('@/components/system/TuiEditor'), {
  ssr: false,
  loading: () => <EmptyPage />,
});

interface Props {
  post?: Post;
}

function WriteForm({ post }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  const editorRef = useRef<any>(null);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState('');
  const [description, onChangeDescription, setDescription] = useInput('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [tagValue, setTagValue] = useState<string>('');
  const isUpdate = !!post;

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
    setBody(editorMarkdown);
  };

  const validInput = () => {
    if (step === 1) {
      return !title || !body || tags.length <= 0;
    }
    // step === 2
    return !title || !body || tags.length <= 0 || !description || !thumbnail;
  };

  const clearInput = () => {
    setTitle('');
    setTags([]);
    setBody('');
    setTagValue('');
    setDescription('');
    setThumbnail('');
    setCategoryId(1);
  };

  // create post mutation
  const { mutate: createPostMutate } = useMutation({
    mutationKey: ['posts'],
    mutationFn: createPosts,
    onSuccess: () => {
      queryClient.refetchQueries(['posts']);
      router.push('/');
    },
    onError: (error: any) => {
      console.log(error.response);
    },
  });

  // update post mutation
  const { mutate: updatePostMutate } = useMutation({
    mutationKey: ['posts'],
    mutationFn: updatePosts,
    onSuccess: () => {
      queryClient.refetchQueries(['posts']);
      router.push(`/${router.query.category}/${router.query.post_title}`);
    },
    onError: (error: any) => {
      console.log(error.response);
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorByStep =
      step === 1
        ? '제목, 내용 태그를 입력해주세요!'
        : '카테고리, 이미지, 추가 설명을 입력해주세요!';
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
      if (isUpdate) {
        updatePostMutate({
          id: post?.id,
          title,
          tags,
          body,
          description,
          thumbnail,
          categoryId,
        });
      } else {
        createPostMutate({
          title,
          tags,
          body,
          description,
          thumbnail,
          categoryId,
        });
      }
      clearInput();
    }
  };
  useEffect(() => {
    if (!isUpdate && !post) return;
    if (title && tags.length > 0 && description && thumbnail) return;
    if (post?.title === title) return;
    if (post?.body === body) return;
    if (post.tags.length === tags.length) return;
    setTitle(post.title);
    setBody(post.body);
    post?.tags.map((tag) => setTags((prev) => [...prev, tag.name]));
    setDescription(post.description);
    setThumbnail(post.thumbnail as string);
    setCategoryId(post.category.id);
  }, [post, isUpdate]);

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
            content={body || post?.body || ''}
            editorRef={editorRef}
          />
        </>
      )}
      {step === 2 && (
        <WriteFinalStep
          title={title}
          value={description}
          onChange={onChangeDescription}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
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

export default WriteForm;
