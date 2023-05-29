import styled from '@emotion/styled';
import Link from 'next/link';
import { themedPalette } from '@/styles/palette';

interface Props {
  headings: any;
  activeIndex: number;
}

function TableOfContent({ headings, activeIndex }: Props) {
  return (
    <Block>
      {headings.map((header: any, index: number) => {
        return (
          <TableHeader key={header.title} tag={header.tag}>
            <Link
              href={`#${header.id}`}
              className={activeIndex === index ? 'active' : ''}
            >
              {header.title}
            </Link>
          </TableHeader>
        );
      })}
    </Block>
  );
}

const Block = styled.div`
  position: sticky;
  top: 112px;
  display: flex;
  flex-direction: column;
  width: 240px;
  margin-left: 72px;
`;

const TableHeader = styled.div<{ tag: string }>`
  font-size: 14px;
  ${(props) => props.tag === 'H2' && 'margin-left: 12px;'};
  &:not(:first-of-type) {
    margin-top: 8px;
  }
  a {
    display: inline-flex;
    line-height: 1.5;
    cursor: pointer;
    transition: all 0.125s ease-in-out;
    color: ${themedPalette.text2};
    &.active {
      color: ${themedPalette.primary2};
      transform: scale(1.05);
    }
    &:hover {
      color: ${themedPalette.text1};
    }
  }
`;

export default TableOfContent;
