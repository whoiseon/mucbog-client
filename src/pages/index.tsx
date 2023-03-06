import Head from 'next/head';
import BasicTemplate from '@/components/templates/BasicTemplate';
import useMyAccount from '@/lib/hooks/useMyAccount';
import { GetServerSideProps } from 'next';
import { dehydrate, isServer, QueryClient } from '@tanstack/query-core';
import { getMyAccount } from '@/lib/api/auth';
import axios from 'axios';
import styled from '@emotion/styled';
import HeaderText from '@/components/system/HeaderText';
import { getDevPosts } from '@/lib/api/post';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/lib/api/types';
import HomeContent from '@/components/home/HomeContent';

export default function Home() {
  const { data: postsData } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getDevPosts,
  });
  return (
    <>
      <Head>
        <title>mucbog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicTemplate>
        <Content>
          <HeaderText title="개발" />
          <HomeContent />
        </Content>
      </BasicTemplate>
    </>
  );
}

const Content = styled.div`
  max-width: 100%;
  width: 1280px;
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const cookie = req ? req.headers.cookie : '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['me'], getMyAccount);
  await queryClient.prefetchQuery(['posts'], getDevPosts);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
