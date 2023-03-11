import styled from '@emotion/styled';
import { media } from '@/lib/media';
import { themedPalette } from '@/styles/palette';
import MailIcon from '@/assets/vectors/footer-mail.svg';
import GithubIcon from '@/assets/vectors/footer-github.svg';
import Link from 'next/link';

function Footer() {
  return (
    <StyledFooter>
      <Content>
        <FooterLeft>
          <span className="copyright">
            ©2023 <i>MUCBOG</i> All Rights Reserved
          </span>
        </FooterLeft>
        <FooterRight>
          <Link href="mailto:whois__@naver.com">
            <MailIcon />
          </Link>
          <Link href="https://github.com/whoiseon" target="_blank">
            <GithubIcon />
          </Link>
        </FooterRight>
      </Content>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  height: 120px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  width: 1280px;
  height: 100%;
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;
  ${media.tablet} {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${themedPalette.text2};

  .routes {
  }

  .copyright {
    i {
      font-style: normal;
      color: ${themedPalette.primary2};
    }
  }

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  ${media.tablet} {
    margin-top: 0;
  }
  a {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    svg {
      width: 42px;
      height: 42px;
      color: ${themedPalette.text4};
      transition: color 0.125s ease-in-out;
    }
    &:hover {
      svg {
        color: ${themedPalette.text3};
      }
    }
  }
`;

export default Footer;
