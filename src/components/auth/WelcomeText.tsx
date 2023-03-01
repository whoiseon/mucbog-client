import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

function WelcomeText() {
  return <StyledText>오늘 하루도 고생많았어요 :)</StyledText>;
}

const StyledText = styled.h2`
  margin-top: 16px;
  margin-bottom: 32px;
  font-size: 16px;
  color: ${themedPalette.text1};
  text-align: center;
`;

export default WelcomeText;
