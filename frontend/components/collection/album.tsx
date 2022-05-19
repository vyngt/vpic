import a_styles from "../../styles/album.module.css";
import Link from "next/link";
import Image from "next/image";
import { Album, AlbumDetailPage, AlbumVideoPage } from "../../models";

export const AlbumElement = ({ album }: { album: Album }) => {
  const album_link = `/albums/${album.id}`;
  return (
    <Link href={album_link}>
      <a className="p-4 border border-4 rounded-3 album">
        <Image
          className="img-fluid"
          src={album.cover}
          width="50%"
          height="50%"
          unoptimized={true}
          layout="responsive"
          objectFit="contain"
          alt={album.name}
        />
        <p>{album.name}</p>
        <p className={a_styles.tag}>
          Tags:
          <span> {album.tags.map((a) => a.name).join(", ")}</span>
        </p>
      </a>
    </Link>
  );
};

export const AlbumRenderer = ({ albums }: { albums: Array<Album> }) => {
  return (
    <div className="d-grid gap-3">
      {albums.map((album) => (
        <AlbumElement key={album.id} album={album} />
      ))}
    </div>
  );
};

export const VideoSwitchButton = ({ data }: { data: AlbumDetailPage }) => {
  return data.album.has_videos ? (
    <div className="px-1">
      <Link
        href={{
          pathname: "/albums/[id]/videos",
          query: { id: data.album.id },
        }}
      >
        <a className="btn btn-outline-success">Videos</a>
      </Link>
    </div>
  ) : (
    <></>
  );
};

export const PictureSwitchButton = ({ data }: { data: AlbumVideoPage }) => {
  return (
    <div className="px-1">
      <Link
        href={{
          pathname: "/albums/[id]",
          query: { id: data.album.id },
        }}
      >
        <a className="btn btn-outline-success">Pictures</a>
      </Link>
    </div>
  );
};

export const SwitchButton = ({
  data,
}: {
  data: AlbumVideoPage | AlbumDetailPage;
}) => {
  return "pictures" in data ? (
    <VideoSwitchButton data={data} />
  ) : (
    <PictureSwitchButton data={data} />
  );
};

export const AlbumInformationRenderer = ({
  data,
}: {
  data: AlbumDetailPage | AlbumVideoPage;
}) => {
  return data.page.current == 1 ? (
    <div className="container">
      <div className={`${a_styles["album-info"]}`}>
        <div className="d-grid gap-3">
          <div className="px-1">
            <p>Album: {data.album.name}</p>
          </div>
          <div className="px-1">
            <p>Created: {new Date(data.album.created).toLocaleString()}</p>
          </div>
          <div className="px-1">
            <p>
              Last Updated: {new Date(data.album.modified).toLocaleString()}
            </p>
          </div>
          <SwitchButton data={data} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export const AlbumTagRenderer = ({ album }: { album: Album }) => {
  return (
    <div className="container">
      <span>Keywords: </span>
      {album.tags.map((tag) => (
        <Link href={`/tags/${tag.slug}`} key={tag.slug}>
          <a className="px-1">
            <span className="badge bg-secondary">{tag.name}</span>
          </a>
        </Link>
      ))}
    </div>
  );
};
