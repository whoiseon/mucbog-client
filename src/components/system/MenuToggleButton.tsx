import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import { animated, useTransition } from 'react-spring';
import MenuIcon from '@/assets/vectors/menu.svg';
import CloseIcon from '@/assets/vectors/close.svg';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

function MenuToggleButton({ isOpen, onClick }: Props) {
  const transitions = useTransition(isOpen, {
    initial: {
      transform: 'scale(1)',
      opacity: 1,
    },
    from: {
      transform: 'scale(0)',
      opacity: 0,
    },
    enter: {
      transform: 'scale(1)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0)',
      opacity: 0,
    },
    reverse: true,
  });

  return (
    <IconButton onClick={onClick}>
      {transitions((style, item) =>
        item ? (
          <Positioner>
            <AnimatedSVGWrapper style={style}>
              <CloseIcon />
            </AnimatedSVGWrapper>
          </Positioner>
        ) : (
          <Positioner>
            <AnimatedSVGWrapper style={style}>
              <MenuIcon />
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
  padding: 8px;
  margin-right: -6px;
  border-radius: 50%;
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

export default MenuToggleButton;
