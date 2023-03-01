import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { themedPalette } from '@/styles/palette';

interface ButtonProps {
  layout?: 'inline' | 'fullWidth';
  size?: 'small' | 'medium';
  variant?: 'primary' | 'secondary' | 'text';
}

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  to?: string;
  href?: string;
}

function Button({
  layout = 'inline',
  size = 'medium',
  variant = 'primary',
  href,
  ...rest
}: Props) {
  if (href) {
    return (
      <StyledLink
        layout={layout}
        variant={variant}
        size={size}
        href={href}
        style={rest.style}
      >
        {rest.children}
      </StyledLink>
    );
  }
  return (
    <StyledButton layout={layout} variant={variant} size={size} {...rest} />
  );
}

const variantStyles = {
  primary: css`
    background: ${themedPalette.primary2};
    color: ${themedPalette.button_text};
    &:hover {
      opacity: 0.875;
    }
  `,
  secondary: css`
    background: ${themedPalette.destructive2};
    color: ${themedPalette.button_text};
    &:hover {
      opacity: 0.875;
    }
  `,
  text: css`
    background: none;
    color: ${themedPalette.text3};
    text-decoration: none;
    &:hover {
      background: ${themedPalette.bg_element3};
      color: ${themedPalette.text2};
    }
  `,
};

const sizeStyles = {
  small: css`
    height: 36px;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
  `,
  medium: css`
    height: 42px;
    font-size: 14px;
    padding-left: 16px;
    padding-right: 16px;
  `,
};

const sharedStyles = (props: ButtonProps) => css`
  display: flex;
  ${sizeStyles[props.size!]};
  ${variantStyles[props.variant!]!};
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.16s ease-in-out;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    filter: grayscale(0.6);
    opacity: 0.3;
  }

  ${props.layout === 'fullWidth' &&
  css`
    width: 100%;
  `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${(props) => sharedStyles(props)}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${(props) => sharedStyles(props)}
`;

export default Button;
