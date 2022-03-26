import React from 'react';
import { ReactComponent as EyeIcon } from '../assets/svg/eye.svg';
import { ReactComponent as LikeIcon } from '../assets/svg/like.svg';
import { ReactComponent as BookmarkIcon } from '../assets/svg/bookmark.svg';
import { convertLongNum } from '../utils';
import styled from 'styled-components';

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  & span {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.8rem;
  }
`;

const CustomButton = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  padding: 0.5rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type CardButtonsProps = {
  popularity: number;
};

export const CardButtons = ({ popularity }: CardButtonsProps) => {
  return (
    <ButtonsWrapper>
      <div>
        <CustomButton>
          <LikeIcon fill="#c71306" width="1.2rem" height="1.2rem" />
        </CustomButton>
        <CustomButton>
          <BookmarkIcon fill="#134b5f" width="1.25rem" height="1.25rem" />
        </CustomButton>
      </div>
      <ViewContainer>
        <EyeIcon fill="rgba(0, 0, 0, 0.4)" width="1rem" height="1rem" />
        <span>{convertLongNum(popularity)}</span>
      </ViewContainer>
    </ButtonsWrapper>
  );
};
