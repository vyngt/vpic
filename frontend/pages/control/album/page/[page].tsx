import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { AuthRequest } from "../../../../app/request";
import { AlbumListPage } from "../../../../models";
import { AlbumManager } from "../../../../components/control/album";
import { ElidedPagination } from "../../../../components/collection";

const AlbumActionIndex = ({ data }: { data: AlbumListPage }) => {
  const title =
    data.page.current === 1
      ? ""
      : `| ${data.page.current} of ${data.page.num_pages}`;
  return (
    <>
      <Head>
        <title>Control | Album {title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AlbumManager data={data} />
      <ElidedPagination
        pathname={"/control/album/page/[page]"}
        paginator={data.page}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query;
  const session = await getSession(context);
  if (session?.access_token) {
    const req = await AuthRequest(session.access_token, "server").albums.list(
      page as string
    );
    const data = req.data;
    return { props: { data } };
  } else {
    return { props: {} };
  }
};

export default AlbumActionIndex;
