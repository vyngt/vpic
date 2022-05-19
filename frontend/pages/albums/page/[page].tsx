import Head from "next/head";
import { ServerSafeRequest } from "../../../app/request";
import { AlbumListPage } from "../../../models";
import { GetServerSideProps } from "next";
import {
  ElidedPagination,
  AlbumRenderer,
} from "../../../components/collection";

const AlbumList = ({ data }: { data: AlbumListPage }) => {
  const pathname = "/albums/page/[page]";
  return (
    <div>
      <Head>
        <title>
          Album List | {data.page.current} of {data.page.num_pages}
        </title>
        <meta name="description" content="Album List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <AlbumRenderer albums={data.albums} />
      </div>

      <ElidedPagination pathname={pathname} paginator={data.page} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query;
  const res = await ServerSafeRequest().albums.list(page as string);
  const data = res.data;

  return { props: { data } };
};

export default AlbumList;
