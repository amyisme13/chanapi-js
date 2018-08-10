export class Post {
  public boardCode: string;
  public threadNumber: number;

  constructor(
    boardCode: string,
    threadNumber: number,
    postRaw: ThreadResponsePost
  ) {
    this.boardCode = boardCode;
    this.threadNumber = threadNumber;

    let file: PostFile | undefined;
    if (postRaw.tim) {
      file = {
        deleted: !!postRaw.filedeleted,
        extension: postRaw.ext,
        height: postRaw.h,
        md5: postRaw.md5,
        name: postRaw.tim,
        originalName: postRaw.filename,
        size: postRaw.fsize,
        url: `//i.4cdn.org/${boardCode}/${postRaw.tim}${postRaw.ext}`,
        width: postRaw.w,

        thumbnail: {
          height: postRaw.tn_h,
          url: `//i.4cdn.org/${boardCode}/${postRaw.tim}s${postRaw.ext}`,
          width: postRaw.tn_w
        }
      };
    }

    return {
      boardCode,
      bumpLimit: postRaw.bumplimit,
      capcodeReplies: postRaw.capcode_replies,
      comment: postRaw.com,
      imageLimit: postRaw.imagelimit,
      imagesCount: postRaw.images,
      modifiedAt: postRaw.last_modified
        ? new Date(postRaw.last_modified * 1000)
        : undefined,
      number: postRaw.no,
      omittedImages: postRaw.omitted_images,
      omittedPosts: postRaw.omitted_posts,
      postedAt: new Date(postRaw.time * 1000),
      repliesCount: postRaw.replies,
      replyTo: postRaw.resto,
      semanticUrl: postRaw.semantic_url,
      subject: postRaw.sub,
      tag: postRaw.tag,
      threadNumber,

      file,
      poster: {
        capcode: postRaw.capcode,
        countryCode: postRaw.country,
        countryName: postRaw.country_name,
        id: postRaw.id,
        name: postRaw.name || 'Anonymous',
        passBoughtIn: postRaw.since4pass,
        tripcode: postRaw.trip
      },
      states: {
        archived: !!postRaw.archived,
        archivedAt: postRaw.archived_on
          ? new Date(postRaw.archived_on * 1000)
          : undefined,
        closed: !!postRaw.closed,
        customSpoiler: postRaw.custom_spoiler,
        spoiler: !!postRaw.spoiler,
        stickied: !!postRaw.sticky
      }
    };
  }
}

//
// Interfaces
//

export interface ThreadResponsePost {
  no: number;
  resto: number;
  sticky?: number;
  closed?: number;
  archived?: number;
  archived_on?: number;
  now: string;
  time: number;
  name?: string;
  trip?: string;
  id?: string;
  capcode?: string;
  country?: string;
  country_name?: string;
  sub?: string;
  com?: string;
  tim?: number;
  filename?: string;
  ext?: string;
  fsize?: number;
  md5?: string;
  w?: number;
  h?: number;
  tn_w?: number;
  tn_h?: number;
  filedeleted?: number;
  spoiler?: number;
  custom_spoiler?: number;
  omitted_posts?: number;
  omitted_images?: number;
  replies?: number;
  images?: number;
  bumplimit?: number;
  imagelimit?: number;
  capcode_replies?: any;
  last_modified?: number;
  tag?: string;
  semantic_url?: string;
  since4pass?: number;
}

export interface Post {
  number: number;
  replyTo: number;
  postedAt: Date;
  subject?: string;
  comment?: string;
  omittedPosts?: number;
  omittedImages?: number;
  repliesCount?: number;
  imagesCount?: number;
  bumpLimit?: number;
  imageLimit?: number;
  capcodeReplies?: any;
  modifiedAt?: Date;
  tag?: string;
  semanticUrl?: string;

  file?: PostFile;
  poster: PostPoster;
  states: PostStates;
}

export interface PostStates {
  stickied: boolean;
  closed: boolean;

  archived: boolean;
  archivedAt?: Date;

  spoiler: boolean;
  customSpoiler?: number;
}

export interface PostPoster {
  name: string;
  tripcode?: string;
  id?: string;
  capcode?: string;
  countryCode?: string;
  countryName?: string;
  passBoughtIn?: number;
}

export interface PostFile {
  name?: number;
  url?: string;
  originalName?: string;
  extension?: string;
  size?: number;
  md5?: string;
  width?: number;
  height?: number;
  deleted?: boolean;

  thumbnail: PostFileThumbnail;
}

export interface PostFileThumbnail {
  width?: number;
  height?: number;
  url?: string;
}
