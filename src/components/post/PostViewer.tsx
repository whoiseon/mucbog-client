import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getPostByTitle } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import styled from '@emotion/styled';
import moment from 'moment';
import { themedPalette } from '@/styles/palette';
import TagCard from '@/components/system/TagCard';
import useIsTablet from '@/lib/hooks/useIsTablet';
import { media } from '@/lib/media';
import { markdownBodyStyle } from '@/styles/EditorStyle';
import Markdown from '@/components/system/Markdown';
import generateSlug, { removeSlug } from '@/lib/generate-slug';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
      <Header>
        <h1>{post?.title}</h1>
        <Info>
          <span className="username">MUCBOG</span>
          <Separator>·</Separator>
          <span>{moment(post?.createdAt).format('YYYY년 M월 DD일')}</span>
          <TagList>
            {post?.tags.map((tag) => (
              <TagCard key={tag.id} size="medium" name={tag.name} />
            ))}
          </TagList>
        </Info>
      </Header>
      <Content>
        <Body>
          <Thumbnail src={post?.thumbnail} alt={post?.title} />
          <BodyContent ref={bodyRef}>
            <Markdown markdownText={post?.body.toString() || ''} />
          </BodyContent>
        </Body>
        {mediaInit && !isTablet && (
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
        )}
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 36px;
    margin: 0 0 32px;
  }
  .username {
    font-size: 16px;
    font-weight: 700;
    color: ${themedPalette.text1};
  }
  span {
    color: ${themedPalette.text3};
    font-weight: 400;
  }
`;

const Info = styled.div``;

const Separator = styled.span`
  margin: 0 8px;
`;

const TagList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 16px;
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

export default PostViewer;
