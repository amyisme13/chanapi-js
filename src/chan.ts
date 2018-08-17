import { AxiosInstance } from 'axios';
import { chanAxios } from './utils';

import { getBoards } from './lib/boards';
import { getThread } from './lib/thread';
import { getCatalog, getThreads } from './lib/threads';

export class Chan {
  public axios: AxiosInstance;

  constructor(options: Option = {}) {
    this.axios = options.axios || chanAxios;
  }

  public get({ board, page, thread }: Parameters = {}) {
    if (board && thread) {
      return getThread(this.axios, board, thread);
    } else if (board && page) {
      return getThreads(this.axios, board, page);
    } else if (board) {
      return getCatalog(this.axios, board);
    } else {
      return getBoards(this.axios);
    }
  }
}

export const chan = new Chan();

interface Option {
  axios?: AxiosInstance;
}

interface Parameters {
  board?: string;
  page?: number;
  thread?: number;
}
