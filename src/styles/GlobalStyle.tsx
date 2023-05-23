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
    font-weight: 500;
    color: ${themedPalette.text1};
    background-color: ${themedPalette.bg_element1};
    transition: 0.125s all ease-in;
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    min-height: 100%;
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

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a,
  a:link {
    color: inherit;
    text-decoration: none;
  }
`;

function GlobalStyle() {
  return <Global styles={styles} />;
}

export default GlobalStyle;
