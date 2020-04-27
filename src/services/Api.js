import axios from 'axios';

const Api = {
  getCompany: (companyId) => {
    return axios.get(`${process.env.API_URL}/api/v1/companies/${companyId}`);
  },
  addReview: (companyId, data) => {
    return axios.post(
      `${process.env.API_URL}/api/v1/companies/${companyId}/reviews`,
      data
    );
  },
  getCompanyReviews: (companyId, page = 1) => {
    return axios.get(
      `${process.env.API_URL}/api/v1/companies/${companyId}/reviews`,
      { params: { page } }
    );
  },
};

export default Api;
