import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';

function PostProfile() {
  return (
    <Block>
      <Profile>
        <img
          src="https://mucbog.s3.ap-northeast-2.amazonaws.com/posts/profile/mucbog-profile.jpeg"
          alt="profile"
        />
      </Profile>
      <Info>
        <h3>황인선</h3>
        <p>
          아름다운 프로덕트를 만드는 것을 좋아하고 배우는 것에 관심이 많은
          <br />
          프론트엔드 엔지니어 입니다.
        </p>
      </Info>
    </Block>
  );
}
const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${themedPalette.border4};
  ${media.tablet} {
    flex-direction: row;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
  img {
    width: 128px;
    height: 128px;
    object-fit: cover;
    border-radius: 50%;
  }
  ${media.tablet} {
    width: auto;
    margin-bottom: 0;
    img {
      margin-right: 32px;
    }
  }
`;

const Info = styled.div`
  text-align: left;
  width: 100%;
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 18px;
    color: ${themedPalette.text1};
  }
  p {
    font-size: 16px;
    margin-bottom: 0;
    margin-top: 12px;
    line-height: 1.5;
    color: ${themedPalette.text3};
  }
`;

export default PostProfile;
