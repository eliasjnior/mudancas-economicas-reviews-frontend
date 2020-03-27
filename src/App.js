import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Tooltip,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { TextField } from 'unform-material-ui';
import { Rating } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { Form, Input } from '@unform/web';
import {
  DialogContentCentered,
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
  const [rating, setRating] = useState(null);
  const [formValue, setFormValue] = useState({});
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isSubmiting, setSubmiting] = useState(false);
  const [isError, setError] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    Api.getCompany(companyId)
      .then(({ data }) => {
        setCompany(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    const data = { rating, ...formRef.current.getData() };
    setFormValue(data);
    setSubmiting(true);
    Api.addReview(companyId, data)
      .then(() => {
        handleClose();
        setSubmiting(false);
        setRating(null);
        formRef.current.reset();
      })
      .catch(() => {
        setSubmiting(false);
      });
  }

  return (
    <>
      {!isLoading && !isError && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {isSubmiting && (
            <>
              <DialogTitle>Aguarde...</DialogTitle>
              <DialogContentCentered>
                <Loading />
              </DialogContentCentered>
            </>
          )}
          {!isSubmiting && (
            <>
              <DialogTitle>Avaliar a empresa {company.name}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Preenche o formulário a seguir e diga-nos o que achou da{' '}
                  {company.name}. Você receberá um email de confirmação.
                </DialogContentText>
                <Form initialData={formValue} ref={formRef}>
                  <TextField
                    name="name"
                    margin="normal"
                    label="Nome"
                    type="text"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    margin="normal"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    margin="normal"
                    name="review"
                    label="Mensagem"
                    fullWidth
                    multiline
                    variant="outlined"
                    rows="5"
                  />
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(any, value) => setRating(value)}
                  />
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>Enviar</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      )}

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
                  onClick={handleOpen}
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
    </>
  );
}

App.propTypes = {
  companyId: PropTypes.string.isRequired,
};
