import PropTypes from 'prop-types';

const Company = PropTypes.shape({
  id: PropTypes.number,
  logo: PropTypes.string,
  name: PropTypes.string,
  cnpj: PropTypes.string,
  phones: PropTypes.string,
  __meta__: PropTypes.shape({
    total_reviews: PropTypes.number,
    rating: PropTypes.number,
    last_review: PropTypes.shape({
      company_id: PropTypes.number,
      name: PropTypes.string,
      rating: PropTypes.number,
      review: PropTypes.string,
      created_at: PropTypes.string,
    }),
  }),
});

export default Company;
