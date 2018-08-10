import { chanAxios, reverseHtmlSpecialChars } from '../utils';
import { Board } from './board';

export class BoardsBoard extends Board implements BoardInfo {
  public title: string;
  public maxCommentCharacters: number;
  public description: string;
  public nsfwBoard: boolean;
  public archived: boolean;

  public feature: BoardFeature;
  public file: BoardFile;
  public limitation: BoardLimitation;
  public pagination: BoardPagination;

  constructor(boardRaw: BoardsResponseBoard) {
    super(boardRaw.board);

    this.archived = !!boardRaw.is_archived;
    this.description = reverseHtmlSpecialChars(boardRaw.meta_description);
    this.maxCommentCharacters = boardRaw.max_comment_chars;
    this.nsfwBoard = !boardRaw.ws_board;
    this.title = boardRaw.title;

    this.feature = {
      codeTags: !!boardRaw.code_tags,
      countryFlags: !!boardRaw.country_flags,
      customSpoilers: boardRaw.custom_spoilers,
      mathTags: !!boardRaw.math_tags,
      sjisTags: !!boardRaw.sjis_tags,
      spoilers: !!boardRaw.spoilers,
      trollFlags: !!boardRaw.troll_flags,
      userIds: !!boardRaw.user_ids,
      webmAudio: !!boardRaw.webm_audio
    };

    this.file = {
      imageLimit: boardRaw.image_limit,
      maxFileSize: boardRaw.max_filesize,
      maxWebmDuration: boardRaw.max_webm_duration,
      maxWebmFileSize: boardRaw.max_webm_duration,
      minImageHeight: boardRaw.min_image_height,
      minImageWidth: boardRaw.min_image_width
    };

    this.limitation = {
      bumpLimit: boardRaw.bump_limit,
      cooldowns: boardRaw.cooldowns,
      forcedAnon: !!boardRaw.forced_anon,
      oekaki: !!boardRaw.oekaki,
      requireSubject: !!boardRaw.require_subject,
      textOnly: !!boardRaw.text_only
    };

    this.pagination = {
      pages: boardRaw.pages,
      threadPerPage: boardRaw.per_page
    };
  }
}

export const getBoards = async () => {
  // try {
  const {
    data: { boards: boardsRaw }
  } = await chanAxios.get<BoardsResponse>('boards.json');

  const boards = new Map<string, BoardsBoard>();

  boardsRaw.forEach(boardRaw => {
    boards.set(boardRaw.board, new BoardsBoard(boardRaw));
  });

  return boards;
  // } catch (err) {
  //   throw err;
  // }
};

//
// Interfaces
//

export interface BoardsResponse {
  boards: BoardsResponseBoard[];
  troll_flags: { [key: string]: string };
}

export interface BoardsResponseBoard {
  blue: string;
  board: string;
  title: string;
  ws_board: number;
  per_page: number;
  pages: number;
  max_filesize: number;
  max_webm_filesize: number;
  max_comment_chars: number;
  max_webm_duration: number;
  bump_limit: number;
  image_limit: number;
  cooldowns: BoardsResponseCooldowns;
  meta_description: string;
  is_archived?: number;
  spoilers?: number;
  custom_spoilers?: number;
  forced_anon?: number;
  user_ids?: number;
  country_flags?: number;
  code_tags?: number;
  webm_audio?: number;
  min_image_width?: number;
  min_image_height?: number;
  oekaki?: number;
  sjis_tags?: number;
  text_only?: number;
  require_subject?: number;
  troll_flags?: number;
  math_tags?: number;
}

export interface BoardsResponseCooldowns {
  threads: number;
  replies: number;
  images: number;
}

export interface BoardInfo {
  code: string;
  title: string;
  maxCommentCharacters: number;
  description: string;
  nsfwBoard: boolean;
  archived: boolean;

  feature: BoardFeature;
  file: BoardFile;
  limitation: BoardLimitation;
  pagination: BoardPagination;
}

export interface BoardFeature {
  spoilers: boolean;
  customSpoilers?: number;
  countryFlags: boolean;
  userIds: boolean;
  codeTags: boolean;
  webmAudio: boolean;
  sjisTags: boolean;
  trollFlags: boolean;
  mathTags: boolean;
}

export interface BoardFile {
  maxFileSize: number;
  maxWebmFileSize: number;
  maxWebmDuration: number;
  imageLimit: number;
  minImageWidth?: number;
  minImageHeight?: number;
}

export interface BoardLimitation {
  bumpLimit: number;
  forcedAnon: boolean;
  oekaki: boolean;
  textOnly: boolean;
  requireSubject: boolean;
  cooldowns: BoardCooldown;
}

export interface BoardCooldown {
  threads: number;
  replies: number;
  images: number;
}

export interface BoardPagination {
  threadPerPage: number;
  pages: number;
}
