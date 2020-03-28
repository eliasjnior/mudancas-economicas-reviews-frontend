import { CircularProgress, FormHelperText } from '@material-ui/core';

import styled, { css } from 'styled-components';

export const Loading = styled(CircularProgress)`
  margin-left: 10px;
`;

export const ErrorForm = styled(FormHelperText)``;

export const FormControl = styled.div`
  margin: 10px 0;

  ${ErrorForm} {
    color: #f44336;
    margin-left: 13px;
  }
`;

export const RatingContainer = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 10px;

  ${(props) =>
    props.error &&
    css`
      border-color: #f44336;
    `}
`;
