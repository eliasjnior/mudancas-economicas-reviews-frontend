import styled, { css } from 'styled-components';

import {
  Avatar,
  CircularProgress,
  DialogContent,
  Button as MaterialButton,
  Fab as MaterialFab,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export const DialogContentCentered = styled(DialogContent)`
  text-align: center;
`;

export const Container = styled.div`
  border-radius: 3px;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
  position: relative;

  ${(props) =>
    props.isLoading &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    `}
`;

export const Title = styled.h1`
  margin: 0 0 15px 0;
  font-size: 1.5em;
  font-weight: 300;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 150px;
  margin-bottom: 15px;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px dashed #dcdcdc;
  padding-bottom: 15px;
  margin-bottom: 15px;
  flex-direction: column;
`;

export const ContainerFooter = styled.div`
  display: flex;
`;

export const Button = styled(MaterialButton)`
  flex: 1;

  &.MuiButtonBase-root {
    margin-right: 1rem;
  }
`;

export const Fab = styled(MaterialFab)`
  box-shadow: none;

  &.MuiButtonBase-root {
    box-shadow: none;
  }
`;

export const Review = styled.div``;

export const ReviewHeader = styled.div`
  display: flex;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const AuthorAvatar = styled(Avatar)`
  margin-right: 15px;
`;

export const ReviewRating = styled(Rating)`
  margin-right: 10px;
`;

export const ReviewCount = styled.span`
  font-size: 0.8em;
  color: #aaa;
`;

export const Author = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

export const ReviewDate = styled.span`
  color: #aaa;
  font-size: 0.7em;
  margin-top: 5px;
`;

export const ReviewContent = styled.p`
  font-weight: 300;
  font-size: 0.9em;
  line-height: 1.5em;
  margin: 15px 0;
`;

export const Loading = styled(CircularProgress)`
  margin: 0 auto;
`;

export const Error = styled.p`
  text-align: center;
  color: #aaa;
`;

export const Text = styled.p`
  margin: 5px 0;
  font-size: 0.9em;
  color: #000;
  text-align: center;
  font-weight: 300;
`;
