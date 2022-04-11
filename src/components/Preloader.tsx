import React from 'react';
import styled from 'styled-components';
import LoaderIcon from '../assets/preloader.gif';

const PreloaderIcon = styled.img.attrs({ src: LoaderIcon, alt: '' })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  z-index: 100;
`;

export const Preloader = () => {
  return <PreloaderIcon />;
};
