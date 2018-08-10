import { chanAxios } from '../utils';
import { Post, ThreadResponsePost } from './post';

export class Thread {
  public boardCode: string;
  public threadNumber: number;

  constructor(boardCode: string, threadNumber: number) {
    this.boardCode = boardCode;
    this.threadNumber = threadNumber;
  }

  public async getPosts() {
    try {
      const {
        data: { posts: postsRaw }
      } = await chanAxios.get<ThreadResponse>(
        `${this.boardCode}/thread/${this.threadNumber}.json`
      );

      const posts = new Map<number, Post>();

      postsRaw.forEach(postRaw => {
        posts.set(
          postRaw.no,
          new Post(this.boardCode, this.threadNumber, postRaw)
        );
      });

      return posts;
    } catch (err) {
      throw err;
    }
  }
}

//
// Interfaces
//

export interface ThreadResponse {
  posts: ThreadResponsePost[];
}
