import axios from 'axios';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
const chanApiBaseUrl = 'https://a.4cdn.org/';
const chanBaseUrl = 'https://boards.4chan.org';

export const chanAxios = axios.create({
  baseURL: `${corsAnywhere}${chanApiBaseUrl}`,
  headers: { 'X-Requested-With': chanBaseUrl }
});

export const reverseHtmlSpecialChars = (str: string): string => {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};
