import Head from "next/head";
import { ServerSafeRequest } from "../../../../app/request";
import { AlbumDetailPage } from "../../../../models";
import { GetServerSideProps } from "next";
import {
  FullPagination,
  PictureRenderer,
  AlbumInformationRenderer,
  AlbumTagRenderer,
} from "../../../../components/collection";

const AlbumPicture = ({ data }: { data: AlbumDetailPage }) => {
  const pathname = "/albums/[id]/page/[page]";
  return (
    <>
      <Head>
        <title>
          {data.album.name} | {data.page.current} of {data.page.range.length}
        </title>
        <meta name="description" content="Album List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AlbumInformationRenderer data={data} />
      <FullPagination pathname={pathname} paginator={data.page} />
      <PictureRenderer pictures={data.pictures} />
      <FullPagination pathname={pathname} paginator={data.page} />
      <AlbumTagRenderer album={data.album} />
    </>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, page } = context.query;
  const res = await ServerSafeRequest().albums.get(
    id as string,
    page as string
  );
  const data: AlbumDetailPage = res.data;

  return { props: { data } };
};

export default AlbumPicture;
