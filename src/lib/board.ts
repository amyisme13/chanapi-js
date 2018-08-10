import { chanAxios } from '../utils';
import { ThreadResponsePost } from './post';
import { ThreadsThread } from './threads';

export class Board {
  public code: string;

  constructor(boardCode: string) {
    this.code = boardCode;
  }

  public getThreads(page?: number) {
    if (page) {
      return this.getThreadsPage(page);
    }
    return this.getCatalog();
  }

  public async getCatalog() {
    try {
      const { data: pages } = await chanAxios.get<BoardCatalogResponse[]>(
        `${this.code}/catalog.json`
      );

      const threadsRaw = pages.reduce(
        (acc: ThreadResponsePost[][], page: BoardCatalogResponse) => {
          const threadsPageRaw = page.threads.map(thread => {
            return thread.last_replies
              ? [thread, ...thread.last_replies]
              : [thread];
          });
          return acc.concat(threadsPageRaw);
        },
        []
      );

      const threads = new Map<number, ThreadsThread>();

      threadsRaw.forEach(threadRaw =>
        threads.set(threadRaw[0].no, new ThreadsThread(this.code, threadRaw))
      );

      return threads;
    } catch (err) {
      throw err;
    }
  }

  public async getThreadsPage(page: number) {
    try {
      const {
        data: { threads: threadsResponse }
      } = await chanAxios.get<BoardPageResponse>(`${this.code}/${page}.json`);

      const threadsRaw = threadsResponse.map(threadRaw => threadRaw.posts);

      const threads = new Map<number, ThreadsThread>();

      threadsRaw.forEach(threadRaw =>
        threads.set(threadRaw[0].no, new ThreadsThread(this.code, threadRaw))
      );

      return threads;
    } catch (err) {
      throw err;
    }
  }
}

//
// Interfaces
//

export interface BoardCatalogResponse {
  page: number;
  threads: BoardCatalogResponseThread[];
}

export interface BoardCatalogResponseThread extends ThreadResponsePost {
  last_replies?: ThreadResponsePost[];
}

export interface BoardPageResponse {
  threads: BoardPageResponseThread[];
}

export interface BoardPageResponseThread {
  posts: BoardPageResponsePost[];
}

export interface BoardPageResponsePost extends ThreadResponsePost {
  tail_size?: number;
}
