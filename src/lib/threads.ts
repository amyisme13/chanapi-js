import { Post, ThreadResponsePost } from './post';
import { Thread } from './thread';

export class ThreadsThread extends Thread {
  public post: Post;
  public lastReplies: Post[];

  constructor(boardCode: string, threadRaw: ThreadResponsePost[]) {
    if (threadRaw.length === 0) {
      throw new Error('Thread dont have any post');
    }

    super(boardCode, threadRaw[0].no);

    const posts = threadRaw.map<Post>(
      postRaw => new Post(boardCode, threadRaw[0].no, postRaw)
    );

    [this.post, ...this.lastReplies] = posts;
  }
}
