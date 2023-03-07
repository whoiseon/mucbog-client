import styled from '@emotion/styled';
import LinkCardList from '@/components/home/LinkCardList';
import { media } from '@/lib/media';
import HomeTagList from '@/components/home/HomeTagList';

function HomeContent() {
  return (
    <Block>
      <LinkCardList />
      <HomeTagList />
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
