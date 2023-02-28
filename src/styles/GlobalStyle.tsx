import { css, Global } from '@emotion/react';
import { themedPalette, themes } from '@/styles/palette';

const styles = css`
  @import url('https://webfontworld.github.io/pretendard/Pretendard.css');

  * {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${themedPalette.text1};
    transition: 0.125s all ease-in;
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    ${themes.light};
  }

  @media (prefers-color-scheme: dark) {
    body {
      ${themes.dark}
    }
  }

  body[data-theme='light'] {
    ${themes.light}
  }

  body[data-theme='dark'] {
    ${themes.dark}
  }

  input,
  button,
  textarea {
    font-family: inherit;
  }
`;

function GlobalStyle() {
  return <Global styles={styles} />;
}

export default GlobalStyle;
