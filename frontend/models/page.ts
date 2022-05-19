import type { Album, Picture, Tag, Video } from "./collection";

export interface BasePage {
  current: number;
}

export interface PagePaginator extends BasePage {
  range: Array<number>;
}

export interface PageElidedPaginator extends BasePage {
  elided_pages: Array<number | "…">;
  num_pages: number;
}

export interface AlbumListPage {
  albums: Array<Album>;
  page: PageElidedPaginator;
}

interface AlbumBasePage {
  album: Album;
  page: PagePaginator;
}

export interface AlbumDetailPage extends AlbumBasePage {
  pictures: Array<Picture>;
}

export interface AlbumVideoPage extends AlbumBasePage {
  videos: Array<Video>;
}

export interface TagListPage {
  tags: Array<Tag>;
}

export interface TagDetailPage extends AlbumListPage {
  tag: Tag;
}
