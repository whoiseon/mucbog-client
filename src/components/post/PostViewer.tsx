import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getPostByTitle } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import styled from '@emotion/styled';
import moment from 'moment';
import { themedPalette } from '@/styles/palette';
import useIsTablet from '@/lib/hooks/useIsTablet';
import { media } from '@/lib/media';
import { markdownBodyStyle } from '@/styles/EditorStyle';
import Markdown from '@/components/system/Markdown';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import postState from '@/states/post';
import PostHead from '@/components/post/PostHead';
import LinkedPosts from '@/components/post/LinkedPosts';
import PostProfile from '@/components/post/PostProfile';

function PostViewer() {
  const bodyRef = useRef<HTMLDivElement>(null);

  const { query } = useRouter();
  const { data: post } = useQuery<Post>({
    queryKey: ['posts', query.category, query.post_title],
    queryFn: () => getPostByTitle(query.post_title as string),
  });
  const [isTablet, mediaInit] = useIsTablet();
  const [headings, setHeadings] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { setPostId, id: nowPostId } = postState();

  const tableOfContentLoader = () => {
    return (
      mediaInit &&
      !isTablet && (
        <Table>
          {headings.map((header: any, index: number) => {
            return (
              <TableHeader key={header.title} tag={header.tag}>
                <Link
                  href={`#${header.id}`}
                  className={activeIndex === index ? 'active' : ''}
                  onClick={() => {
                    const el = document.getElementById(header.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {header.title}
                </Link>
              </TableHeader>
            );
          })}
        </Table>
      )
    );
  };

  useEffect(() => {
    if (!post) return;
    setPostId(post?.id);
    console.log(nowPostId);
  }, [post, setPostId, nowPostId]);

  useEffect(() => {
    const headerTags = bodyRef.current?.querySelectorAll(
      'h1, h2, h3, h4, h5, h6',
    );
    if (!bodyRef.current || headings.length > 0) return;

    const newHeaders = Array.from(headerTags || []).map((h) => ({
      tag: h.tagName,
      title: h.textContent,
      id: h.id,
    }));
    setHeadings(newHeaders);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const index = headings.findIndex((heading: any) => {
        const el = document.getElementById(heading.id);
        if (!el) return false;
        const top = el.getBoundingClientRect().top + (scrollTop - 76);
        const bottom = el.getBoundingClientRect().bottom + scrollTop;
        return scrollTop >= top && scrollTop < bottom;
      });
      setActiveIndex((prev) => {
        if (index === -1) return prev;
        return index;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  return (
    <Block>
      <PostHead
        title={post?.title}
        createdAt={post?.createdAt}
        tags={post?.tags}
      />
      <Content>
        <Body>
          <Thumbnail src={post?.thumbnail} alt={post?.title} />
          <BodyContent ref={bodyRef}>
            <Markdown markdownText={post?.body.toString() || ''} />
          </BodyContent>
          <UpdatedAt>
            <p>마지막 업데이트</p>
            <p>{moment(post?.updatedAt).format('YYYY년 M월 DD일')}</p>
          </UpdatedAt>
          <PostProfile />
          <LinkedPosts
            prevPost={post?.prevPost?.title}
            nextPost={post?.nextPost?.title}
          />
        </Body>
        {tableOfContentLoader()}
      </Content>
    </Block>
  );
}

const Block = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  & > a {
    display: block;
  }
  ${media.mobile} {
    margin-top: 88px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 24px;
  ${media.mobile} {
    margin-top: 32px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BodyContent = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;
  line-height: 1.5;
  color: ${themedPalette.text1};
  font-size: 16px;
  ${media.tablet} {
    font-size: 18px;
  }
  ${markdownBodyStyle};
`;

const Table = styled.div`
  position: sticky;
  top: 112px;
  display: flex;
  flex-direction: column;
  width: 240px;
  margin-left: 72px;
`;

const TableHeader = styled.div<{ tag: string }>`
  font-size: 14px;
  ${(props) => props.tag === 'H2' && 'margin-left: 12px;'};
  &:not(:first-of-type) {
    margin-top: 8px;
  }
  a {
    display: inline-flex;
    line-height: 1.5;
    cursor: pointer;
    transition: all 0.125s ease-in-out;
    color: ${themedPalette.text3};
    &.active {
      color: ${themedPalette.primary2};
      transform: scale(1.05);
    }
    &:hover {
      color: ${themedPalette.text1};
    }
  }
`;

const Thumbnail = styled.img`
  max-height: 100vh;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 16px;
`;

const UpdatedAt = styled.div`
  margin-top: 80px;
  p {
    font-weight: 600;
    font-size: 16px;
    margin: 0;
    color: ${themedPalette.text3};
    &:nth-of-type(1) {
      color: ${themedPalette.primary2};
    }
  }
`;

export default PostViewer;
