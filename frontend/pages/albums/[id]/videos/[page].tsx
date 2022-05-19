import Head from "next/head";
import {
  AlbumInformationRenderer,
  FullPagination,
  VideoRenderer,
} from "../../../../components/collection";
import { ServerSafeRequest } from "../../../../app/request";
import { AlbumVideoPage } from "../../../../models";
import { GetServerSideProps } from "next";

const AlbumVideo = ({ data }: { data: AlbumVideoPage }) => {
  const pathname = "/albums/[id]/videos/[page]";

  return (
    <>
      <Head>
        <title>
          {data.album.name} | Videos | {data.page.current} of{" "}
          {data.page.range.length}
        </title>
        <meta name="description" content="Album List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AlbumInformationRenderer data={data} />
      <FullPagination pathname={pathname} paginator={data.page} />
      <VideoRenderer videos={data.videos} />
      <FullPagination pathname={pathname} paginator={data.page} />
    </>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, page } = context.query;
  const res = await ServerSafeRequest().albums.videos(
    id as string,
    page as string
  );
  const data = res.data;

  return { props: { data } };
};

export default AlbumVideo;
