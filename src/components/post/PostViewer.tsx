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

function PostViewer() {
  const { query } = useRouter();
  const { data: post } = useQuery<Post>({
    queryKey: ['posts', query.category, query.post_title],
    queryFn: () => getPostByTitle(query.post_title as string),
  });
  const [isTablet, mediaInit] = useIsTablet();
  console.log(post);
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
          <BodyContent
            dangerouslySetInnerHTML={{ __html: post?.body as string }}
          />
        </Body>
        {mediaInit && !isTablet && <Table>456</Table>}
      </Content>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  & > a {
    display: block;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 36px;
    margin-top: 96px;
    margin-bottom: 32px;
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
  margin-top: 64px;
  gap: 64px;
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
  font-size: 14px;
  ${media.tablet} {
    font-size: 16px;
  }
  ${markdownBodyStyle};
`;

const Table = styled.div`
  position: sticky;
  width: 240px;
  top: 76px;
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
