import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { renderStatic } from '@/lib/renderStatic';
import nookies, { parseCookies } from 'nookies';

type Props = {
  theme: 'dark' | 'light';
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const { css, ids } = await renderStatic(page.html);
    const initialProps = await Document.getInitialProps(ctx);
    const cookies = nookies.get(ctx);
    const theme = cookies.theme || 'dark';
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </>
      ),
      theme,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body data-theme={this.props.theme}>
          {/*<ScriptTag />*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }
