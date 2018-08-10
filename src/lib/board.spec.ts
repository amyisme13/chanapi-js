import { test } from 'ava';
import { Board } from './board';

const boardCode = 'g';
const board = new Board(boardCode);

test('method getThreads without page should not throws', async t => {
  await t.notThrows(board.getThreads());
});

test('method getThreads without page should not be empty', async t => {
  const boards = await board.getThreads();
  t.not(boards.size, 0);
});

test('method getThreads with page should not throws', async t => {
  await t.notThrows(board.getThreads(1));
});

test('method getThreads with page should not be empty', async t => {
  const boards = await board.getThreads(1);
  t.not(boards.size, 0);
});
