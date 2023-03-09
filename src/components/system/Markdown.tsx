import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

interface Props {
  markdownText: string;
}

function Markdown({ markdownText }: Props) {
  const remarkPlugins = [remarkGfm];
  const rehypePlugins = [rehypeRaw, rehypeHighlight, rehypeSlug];

  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
      {markdownText}
    </ReactMarkdown>
  );
}

export default Markdown;
