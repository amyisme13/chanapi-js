import { test } from 'ava';
import { Thread } from './thread';

const boardCode = 'g';
const threadNumber = 67047138;
const invalidThreadNumber = 1;

test('Thread.getPosts() should not be empty', async t => {
  const thread = new Thread(boardCode, threadNumber);
  const posts = await thread.getPosts();
  t.not(posts.size, 0);
});

test('method getPosts of invalid thread should throw', async t => {
  const thread = new Thread(boardCode, invalidThreadNumber);
  await t.throws(thread.getPosts());
});
