import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import { Pagination, Alert } from '@material-ui/lab';

import {
  Dialog,
  Loading,
  Review,
  ReviewHeader,
  AuthorAvatar,
  HeaderContainer,
  Author,
  ReviewRating,
  ReviewDate,
  ReviewContent,
  PaginationContainer,
  Title,
} from './AllDialog.styled';
import CompanyPropType from '../../prop-types/Company.type';
import Api from '../../services/Api';

export const AllDialog = ({ open, close, company }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const loadPage = useCallback((pageToLoad) => {
    setLoading(true);
    Api.getCompanyReviews(company.id, pageToLoad)
      .then((fullResponse) => {
        const { data: response } = fullResponse;

        setData(response.data);
        setPage(response.page);
        setTotalPages(response.lastPage);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChangePage = useCallback((event, value) => {
    loadPage(value);
  }, []);

  useEffect(() => {
    if (open && !data) {
      loadPage(page);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>
        <Title>
          Comentários: {company.name}
          <IconButton aria-label="close" onClick={close}>
            <CloseIcon />
          </IconButton>
        </Title>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !data.length ? (
          <Typography variant="body1">
            Não foram encontrados comentários para essa empresa
          </Typography>
        ) : (
          data.map((item) => (
            <Review key={item.created_at}>
              <ReviewHeader>
                <AuthorAvatar>{item.name[0]}</AuthorAvatar>
                <HeaderContainer>
                  <Author>{item.name}</Author>
                  <ReviewRating size="small" readOnly value={item.rating} />
                  <ReviewDate>date</ReviewDate>
                </HeaderContainer>
              </ReviewHeader>
              <ReviewContent>{item.review}</ReviewContent>
            </Review>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <PaginationContainer>
          <Pagination
            page={page}
            count={totalPages}
            disabled={loading}
            onChange={handleChangePage}
          />
        </PaginationContainer>
      </DialogActions>
    </Dialog>
  );
};

AllDialog.propTypes = {
  company: CompanyPropType.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
