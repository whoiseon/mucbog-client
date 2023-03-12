import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { css } from '@emotion/react';
import Link from 'next/link';

interface TagProps {
  size?: 'small' | 'medium';
}

interface Props extends TagProps {
  name: string;
}

function TagCard({ name, size = 'small' }: Props) {
  return (
    <StyledTag href={`/tag?=${name}`} size={size}>
      {name}
    </StyledTag>
  );
}

const sizeStyles = {
  small: css`
    height: 28px;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
  `,
  medium: css`
    height: 32px;
    font-size: 18px;
    padding-left: 14px;
    padding-right: 14px;
  `,
};

const SharedStyles = (props: TagProps) => css`
  display: inline-flex;
  align-items: center;
  ${sizeStyles[props.size!]}
  color: ${themedPalette.primary1};
  background-color: ${themedPalette.bg_element3};
  border-radius: 4px;
`;

const StyledTag = styled(Link)<TagProps>`
  ${(props) => SharedStyles(props)}
`;

export default TagCard;
