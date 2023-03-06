import styled from '@emotion/styled';
import LinkCardList from '@/components/home/LinkCardList';
import { media } from '@/lib/media';

function HomeContent() {
  return (
    <Block>
      <LinkCardList />
      <div>태그</div>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 32px;
  ${media.tablet} {
    flex-direction: row;
  }
`;

export default HomeContent;
