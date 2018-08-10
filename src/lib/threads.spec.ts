import { test } from 'ava';
import { ThreadResponsePost } from './post';
import { ThreadsThread } from './threads';

const boardCode = 'g';

test('Instantiate ThreadsThread with empty threadRaw should throw', t => {
  const emptyThreadRaw: ThreadResponsePost[] = [];
  t.throws(() => {
    try {
      const thread = new ThreadsThread(boardCode, emptyThreadRaw);
      return thread;
    } catch (err) {
      throw err;
    }
  });
});
