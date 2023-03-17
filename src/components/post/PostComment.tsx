import Giscus from '@giscus/react';
import styled from '@emotion/styled';

function PostComment() {
  return (
    <Block>
      <Giscus
        repo="whoiseon/mucbog-comments"
        repoId="R_kgDOJJDeXA"
        category="Comments"
        categoryId="DIC_kwDOJJDeXM4CU2P_"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="dark"
        lang="ko"
        loading="lazy"
      />
    </Block>
  );
}

const Block = styled.div`
  margin-top: 48px;
  .color-text-secondary text-sm {
    display: none;
  }
`;

export default PostComment;
