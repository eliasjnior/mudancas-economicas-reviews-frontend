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
import { Loading } from './RequestDialog.styled';
import Alert from '../Alert';

import Api from '../../services/Api';

export default function RequestDialog({ company, open, close }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: null,
    review: '',
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit() {
    setLoading(true);

    Api.addReview(company.id, formData)
      .then((response) => {
        // Set success message
        setSuccess(true);

        // Close the dialog
        close();
      })
      .catch((error) => {
        // Set error message
        setError(true);
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

  return (
    <>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Seu comentário foi enviado. Verifique no seu email para mais
          informações.
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error">
          Houve um erro ao enviar o formulário.
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={() => !loading && close()}
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
            error={errors.name}
            fullWidth
            disabled={loading}
            onChange={(event) => changeFormData('rating', event.target.value)}
          />
          <TextField
            id="email"
            margin="normal"
            label="Email"
            type="email"
            error={errors.email}
            variant="outlined"
            fullWidth
            disabled={loading}
            onChange={(event) => changeFormData('email', event.target.value)}
          />
          <TextField
            id="review"
            margin="normal"
            label="Mensagem"
            fullWidth
            error={errors.review}
            multiline
            variant="outlined"
            rows="5"
            disabled={loading}
            onChange={(event) => changeFormData('review', event.target.value)}
          />
          <Rating
            name="rating"
            disabled={loading}
            onChange={(any, value) => changeFormData('rating', value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" disabled={loading}>
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
