interface Base {
  id: number;
  created: string;
  modified: string;
}

export interface BaseTag {
  name: string;
  slug: string;
}

export interface Tag extends Base, BaseTag {}

export interface Picture extends Base {
  image: string;
  album: number;
}

export interface Album extends Base {
  name: string;
  cover: string;
  tags: Array<BaseTag>;
  has_videos: boolean;
}

export interface Video extends Base {
  album: Album["id"];
  record: string;
}
