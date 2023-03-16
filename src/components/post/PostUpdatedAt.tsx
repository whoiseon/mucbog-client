import moment from 'moment/moment';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props {
  updatedAt?: Date;
}

function PostUpdatedAt({ updatedAt }: Props) {
  return (
    <Block>
      <p>마지막 업데이트</p>
      <p>{moment(updatedAt).format('YYYY년 M월 DD일')}</p>
    </Block>
  );
}

const Block = styled.div`
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

export default PostUpdatedAt;
