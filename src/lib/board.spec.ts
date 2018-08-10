import { test } from 'ava';
import { Board } from './board';

const boardCode = 'g';
const board = new Board(boardCode);

const invalidBoardCode = 'asdasd';
const invalidBoard = new Board(invalidBoardCode);

test('method getThreads without page should not throws', async t => {
  await t.notThrows(board.getThreads());
});

test('method getThreads without page should not be empty', async t => {
  const threads = await board.getThreads();
  t.not(threads.size, 0);
});

test('method getThreads with page should not throws', async t => {
  await t.notThrows(board.getThreads(1));
});

test('method getThreads with page should not be empty', async t => {
  const threads = await board.getThreads(1);
  t.not(threads.size, 0);
});

test('method getThreads of invalid board without page should throw', async t => {
  await t.throws(invalidBoard.getThreads());
});

test('method getThreads of invalid board with page should throw', async t => {
  await t.throws(invalidBoard.getThreads(1));
});
