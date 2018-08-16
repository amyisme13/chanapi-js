import { AxiosInstance } from 'axios';
import { Post, rawToPost, ThreadResponsePost } from './post';

export const getThread = async (
  axios: AxiosInstance,
  board: string,
  thread: number
) => {
  try {
    const {
      data: { posts: postsRaw }
    } = await axios.get<ThreadResponse>(`${board}/thread/${thread}.json`);

    const posts = new Map<number, Post>();

    postsRaw.forEach(postRaw => {
      posts.set(postRaw.no, rawToPost(board, postRaw));
    });

    return posts;
  } catch (err) {
    throw err;
  }
};

//
// Interfaces
//

export interface ThreadResponse {
  posts: ThreadResponsePost[];
}
