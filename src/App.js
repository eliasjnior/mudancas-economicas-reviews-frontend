import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Tooltip, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import {
  Container,
  ContainerHeader,
  ContainerFooter,
  Title,
  Image,
  Review,
  ReviewHeader,
  HeaderContainer,
  AuthorAvatar,
  Author,
  ReviewRating,
  ReviewCount,
  ReviewDate,
  ReviewContent,
  Loading,
  Error,
} from './App.styled';
import Api from './services/Api';

export default function App({ companyId }) {
  const [company, setCompany] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      Api.getCompany(companyId)
        .then(({ data }) => {
          setCompany(data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }, 2500);
  }, []);

  function addNewReview() {}

  return (
    <Container isLoading={isLoading}>
      {isLoading && <Loading />}

      {!isLoading && !isError && (
        <>
          <ContainerHeader>
            <Title>{company.name}</Title>
            <Image src={company.logo} alt={company.name} />
            {!!company.__meta__.total_reviews && (
              <>
                <ReviewRating readOnly value={company.__meta__.rating} />
                <ReviewCount>
                  {company.__meta__.total_reviews}{' '}
                  {company.__meta__.total_reviews > 1
                    ? 'avaliações'
                    : 'avaliação'}
                </ReviewCount>
              </>
            )}
          </ContainerHeader>

          {company.__meta__.last_review && (
            <Review>
              <ReviewHeader>
                <AuthorAvatar>
                  {company.__meta__.last_review.name[0]}
                </AuthorAvatar>
                <HeaderContainer>
                  <Author>{company.__meta__.last_review.name}</Author>
                  <ReviewRating
                    size="small"
                    readOnly
                    value={company.__meta__.last_review.rating}
                  />
                  <ReviewDate>
                    {new Date(
                      company.__meta__.last_review.created_at
                    ).toLocaleDateString()}
                  </ReviewDate>
                </HeaderContainer>
              </ReviewHeader>
              <ReviewContent>
                {company.__meta__.last_review.review}
              </ReviewContent>
            </Review>
          )}

          {!company.__meta__.last_review && (
            <Error>
              Essa empresa ainda não posusi uma avaliação. Seja o primeiro a
              avaliar!
            </Error>
          )}

          <ContainerFooter>
            <Tooltip title="Adicionar nova avaliação" aria-label="add">
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={addNewReview}
              >
                <Add />
              </Fab>
            </Tooltip>
          </ContainerFooter>
        </>
      )}

      {!isLoading && isError && (
        <Error>
          Houve um erro ao carregar a empresa. Tente novamente mais tarde.
        </Error>
      )}
    </Container>
  );
}

App.propTypes = {
  companyId: PropTypes.string.isRequired,
};
