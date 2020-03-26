import axios from 'axios';

const Api = {
  getCompany: (companyId) => {
    return axios.get(`${process.env.API_URL}/api/v1/companies/${companyId}`);
  },
};

export default Api;
