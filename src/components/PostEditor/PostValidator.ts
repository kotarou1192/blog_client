import {
  POST_BODY_MAX_CHARS,
  POST_TAGS_MAX_COUNT,
  POST_TITLE_MAX_CHARS
} from "./../../configs/Config";

export const postTitleIsValid = (title: string) => {
  return title === "" || title.length <= POST_TITLE_MAX_CHARS;
};

export const postBodyIsValid = (body: string) => {
  return body.length > 0 && body.length <= POST_BODY_MAX_CHARS;
};

export const postTagsCountIsValid = (tags: any[]) => {
  return tags.length <= POST_TAGS_MAX_COUNT;
};
