import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

import { Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import {
  Container,
  ContainerHeader,
  ContainerFooter,
  Title,
  Image,
  ReviewRating,
  ReviewCount,
  Loading,
  Error,
  Text,
  Button,
  Fab,
} from './App.styled';
import Api from './services/Api';
import RequestDialog from './components/RequestDialog';
import { AllDialog } from './components/AllDialog';

export default function App({ companyId }) {
  const [company, setCompany] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const [openAll, setOpenAll] = useState(false);

  useEffect(() => {
    Api.getCompany(companyId)
      .then(({ data }) => {
        const newData = data;

        if (data.__meta__.last_review) {
          const date = parseISO(data.__meta__.last_review.created_at);
          const formattedDate = format(date, 'dd/MM/yyyy');
          newData.__meta__.last_review.formatted_date = formattedDate;
        }

        setCompany(newData);
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

  return (
    <>
      {!isLoading && !isError && (
        <>
          <RequestDialog company={company} open={open} close={handleClose} />
          <AllDialog
            company={company}
            open={openAll}
            close={() => setOpenAll(false)}
          />
        </>
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
              {company.cnpj && <Text>CNPJ: {company.cnpj}</Text>}
              {company.phones && <Text>{company.phones}</Text>}
            </ContainerHeader>

            {!company.__meta__.last_review && (
              <Error>
                Essa empresa ainda não possui uma avaliação. Seja o primeiro a
                avaliar!
              </Error>
            )}

            <ContainerFooter>
              <Button
                variant="contained"
                onClick={() => setOpenAll(true)}
                disableElevation
              >
                Ver avaliações
              </Button>

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
