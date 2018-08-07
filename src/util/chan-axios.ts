import axios from 'axios';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
const chanApiBaseUrl = 'https://a.4cdn.org/';
const chanBaseUrl = 'https://boards.4chan.org';

export default axios.create({
  baseURL: `${corsAnywhere}${chanApiBaseUrl}`,
  headers: { 'X-Requested-With': chanBaseUrl }
});
