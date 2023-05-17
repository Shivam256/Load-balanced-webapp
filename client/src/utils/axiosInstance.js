import axios from 'axios';

const axiosInstance = axios.create({
  //   baseURL: 'https://workfloe.vercel.app/',
  // baseURL: 'https://workfloe.herokuapp.com/',
  baseURL: 'http://localhost:8080/',
  headers: {
    common: {
      // can be common or any other method
      'Access-Control-Allow-Origin': '*',
    },
  },
  // baseURL:"http://localhost:5001/"
});

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;

export default axiosInstance;
