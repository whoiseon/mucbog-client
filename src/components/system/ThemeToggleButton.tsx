import styled from '@emotion/styled';
import DarkIcon from '@/assets/vectors/dark.svg';
import LightIcon from '@/assets/vectors/light.svg';
import { themedPalette } from '@/styles/palette';
import { useToggleTheme } from '@/lib/hooks/useToggleTheme';
import { animated, useTransition } from 'react-spring';
import React from 'react';

function ThemeToggleButton() {
  const [theme, toggle] = useToggleTheme();

  const isDark = theme === 'dark';
  const transitions = useTransition(isDark, {
    initial: {
      transform: 'scale(1) translateY(0)',
      opacity: 1,
    },
    from: {
      transform: 'scale(0) translateY(28px)',
      opacity: 0,
    },
    enter: {
      transform: 'scale(1) translateY(0)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0) translateY(-28px)',
      opacity: 0,
    },
    reverse: true,
  });

  return (
    <IconButton onClick={toggle}>
      {transitions((style, item) =>
        item ? (
          <Positioner>
            <AnimatedSVGWrapper style={style}>
              <DarkIcon />
            </AnimatedSVGWrapper>
          </Positioner>
        ) : (
          <Positioner>
            <AnimatedSVGWrapper style={style}>
              <LightIcon />
            </AnimatedSVGWrapper>
          </Positioner>
        ),
      )}
    </IconButton>
  );
}

const IconButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.125s ease-in-out;

  svg {
    color: ${themedPalette.text3};
    width: 28px;
    height: 28px;
  }
`;

const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SVGWrapper = styled.div`
  color: ${themedPalette.text1};
  svg {
    display: block;
  }
`;

const AnimatedSVGWrapper = animated(SVGWrapper);

export default ThemeToggleButton;
