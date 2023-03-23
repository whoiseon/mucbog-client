import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

function EmptyPage() {
  return (
    <Block>
      <h1>Editor Loading...</h1>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  h1 {
    font-size: 28px;
    color: ${themedPalette.text4};
  }
`;

export default EmptyPage;
