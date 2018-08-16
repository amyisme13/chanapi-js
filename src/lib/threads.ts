import { AxiosInstance } from 'axios';
import { Post, rawToPost, ThreadResponsePost } from './post';

export const rawToBoardThread = (
  board: string,
  threadRaw: ThreadResponsePost[]
): BoardThread => {
  const posts = threadRaw.map<Post>(postRaw => rawToPost(board, postRaw));

  const [post, ...lastReplies] = posts;
  return {
    lastReplies,
    post
  };
};

export const getCatalog = async (axios: AxiosInstance, board: string) => {
  try {
    const { data: pages } = await axios.get<BoardCatalogResponse[]>(
      `${board}/catalog.json`
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

    const threads = new Map<number, BoardThread>();

    threadsRaw.forEach(threadRaw =>
      threads.set(threadRaw[0].no, rawToBoardThread(board, threadRaw))
    );

    return threads;
  } catch (err) {
    throw err;
  }
};

export const getThreads = async (
  axios: AxiosInstance,
  board: string,
  page: number
) => {
  try {
    const {
      data: { threads: threadsResponse }
    } = await axios.get<BoardPageResponse>(`${board}/${page}.json`);

    const threadsRaw = threadsResponse.map(threadRaw => threadRaw.posts);

    const threads = new Map<number, BoardThread>();

    threadsRaw.forEach(threadRaw =>
      threads.set(threadRaw[0].no, rawToBoardThread(board, threadRaw))
    );

    return threads;
  } catch (err) {
    throw err;
  }
};

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

export interface BoardThread {
  post: Post;
  lastReplies: Post[];
}
