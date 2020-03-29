import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import CompanyType from '../../prop-types/Company.type';
import {
  Loading,
  FormControl,
  RatingContainer,
  ErrorForm,
} from './RequestDialog.styled';
import Alert from '../Alert';

import Api from '../../services/Api';

export default function RequestDialog({ company, open, close }) {
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit() {
    setLoading(true);

    setError(false);
    setErrors({});

    Api.addReview(company.id, formData)
      .then((response) => {
        // Set success message
        setSuccess(response.message);

        // Close the dialog
        close();
      })
      .catch((exceptionError) => {
        // Set error message
        if (exceptionError.response.status === 500) {
          const newErrors = {};

          exceptionError.response.data.errors.forEach((errorItem) => {
            newErrors[errorItem.path] = errorItem.message;
          });

          setErrors(newErrors);
        }

        if (exceptionError.response.data.message) {
          setError(exceptionError.response.data.message);
        } else {
          setError('Houve um erro desconhecido. Tente novamente.');
        }
      })
      .finally(() => {
        // Always disable loading
        setLoading(false);
      });
  }

  function changeFormData(key, value) {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  function handleClose() {
    setErrors({});
    setFormData({});
    close();
  }

  return (
    <>
      <Snackbar
        open={!!success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Seu comentário foi enviado. Verifique no seu email para mais
          informações.
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={() => !loading && handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Avaliar a empresa {company.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preenche o formulário a seguir e diga-nos o que achou da{' '}
            {company.name}. Você receberá um email de confirmação.
          </DialogContentText>
          <TextField
            id="name"
            margin="normal"
            label="Nome"
            type="text"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            disabled={loading}
            required
            onChange={(event) => changeFormData('name', event.target.value)}
          />
          {error.name}
          <TextField
            id="email"
            margin="normal"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            fullWidth
            disabled={loading}
            required
            onChange={(event) => changeFormData('email', event.target.value)}
          />
          <TextField
            id="review"
            margin="normal"
            label="Mensagem"
            fullWidth
            error={!!errors.review}
            helperText={errors.review}
            multiline
            variant="outlined"
            rows="5"
            disabled={loading}
            onChange={(event) => changeFormData('review', event.target.value)}
          />
          <FormControl>
            <RatingContainer error={!!errors.rating}>
              <Rating
                name="rating"
                disabled={loading}
                onChange={(any, value) => changeFormData('rating', value)}
              />
            </RatingContainer>
            {errors.rating && <ErrorForm>{errors.rating}</ErrorForm>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {(loading && (
              <>
                Enviando <Loading size="20px" />
              </>
            )) || <>Enviar</>}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

RequestDialog.propTypes = {
  company: CompanyType.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
