import styled from '@emotion/styled';
import LinkCardList from '@/components/home/LinkCardList';
import { media } from '@/lib/media';
import HomeTagList from '@/components/home/HomeTagList';
import { useQuery } from '@tanstack/react-query';
import { PostBody } from '@/lib/api/types';
import { getDevRecentPosts, getPostsByTag } from '@/lib/api/post';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function HomeContent() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data: postData } = useQuery<PostBody>({
    queryKey: router.query.tag ? ['posts', router.query.tag] : ['posts'],
    queryFn: router.query.tag
      ? () => getPostsByTag(router.query.tag as string)
      : () => getDevRecentPosts(page),
  });
  useEffect(() => {
    if (router.query.page) {
      setPage(Number(router.query.page));
    } else {
      setPage(1);
    }
  }, [router.query.page]);
  const totalPage =
    postData?.totalPost && Math.ceil(postData?.totalPost / postData?.limit);
  return (
    <Block>
      <LinkCardList postData={postData} totalPage={totalPage} page={page} />
      <HomeTagList totalPost={postData?.totalPost} />
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  gap: 32px;
  ${media.tablet} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;

export default HomeContent;
