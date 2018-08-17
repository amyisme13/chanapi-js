// tslint:disable:no-expression-statement
import { test } from 'ava';
import { chan } from './chan';

const board = 'g';
const invalidBoard = 'asdasd';

const page = 1;
const invalidPage = -1;

const thread = 51971506;
const invalidThread = -1;

// Boards
test('get with no arg should not throws', async t => {
  await t.notThrows(chan.get());
});

test('get with no arg should not return empty Map', async t => {
  const boards = await chan.get();
  t.not(boards.size, 0);
});

// Catalog
test('get with board arg should not throws', async t => {
  await t.notThrows(chan.get({ board }));
});

test('get with board arg should not return empty Map', async t => {
  const threads = await chan.get({ board });
  t.not(threads.size, 0);
});

test('get with invalid board arg should throws', async t => {
  await t.throws(chan.get({ board: invalidBoard }));
});

// Threads
test('get with board & page arg should not throws', async t => {
  await t.notThrows(chan.get({ board, page }));
});

test('get with board & page arg should not return empty Map', async t => {
  const threads = await chan.get({ board, page });
  t.not(threads.size, 0);
});

test('get with valid board & invalid page arg should throws', async t => {
  await t.throws(chan.get({ board, page: invalidPage }));
});

test('get with invalid board & valid page arg should throws', async t => {
  await t.throws(chan.get({ board: invalidBoard, page }));
});

test('get with invalid board & page arg should throws', async t => {
  await t.throws(chan.get({ board: invalidBoard, page: invalidPage }));
});

// Thread
test('get with board & thread arg should not throws', async t => {
  await t.notThrows(chan.get({ board, thread }));
});

test('get with board & thread arg should not return empty Map', async t => {
  const posts = await chan.get({ board, thread });
  t.not(posts.size, 0);
});

test('get with valid board & invalid thread arg should throws', async t => {
  await t.throws(chan.get({ board, thread: invalidThread }));
});

test('get with invalid board & valid thread arg should throws', async t => {
  await t.throws(chan.get({ board: invalidBoard, thread }));
});

test('get with invalid board & invalid thread arg should throws', async t => {
  await t.throws(chan.get({ board: invalidBoard, thread: invalidThread }));
});
