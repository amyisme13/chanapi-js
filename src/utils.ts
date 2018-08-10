import axios from 'axios';

const chanApiBaseUrl = 'https://a.4cdn.org/';
const chanBaseUrl = 'https://boards.4chan.org';

export const chanAxios = axios.create({
  baseURL: chanApiBaseUrl,
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
