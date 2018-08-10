// tslint:disable:no-expression-statement
import { test } from 'ava';
import { getBoards } from './boards';

test('getBoards should not throws', async t => {
  await t.notThrows(getBoards);
});

test('getBoards should not be empty', async t => {
  const boards = await getBoards();
  t.not(boards.size, 0);
});
