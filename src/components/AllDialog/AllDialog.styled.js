import styled from 'styled-components';

import { Avatar, Dialog as MaterialDialog } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export const Dialog = styled(MaterialDialog)`
  & .MuiDialog-paper {
    width: 100%;
    max-width: 700px;
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

export const Review = styled.div`
  margin-bottom: 2rem;
`;

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

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
