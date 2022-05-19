import Head from "next/head";
import { GetServerSideProps } from "next";
import { ServerSafeRequest } from "../../../../app/request";
import { TagDetailPage } from "../../../../models";
import {
  AlbumRenderer,
  ElidedPagination,
} from "../../../../components/collection";

const TagDetail = ({ data }: { data: TagDetailPage }) => {
  const pathname = "/tags/[slug]/page/[page]";
  return (
    <div>
      <Head>
        <title>{data.tag.name}</title>
        <meta name="description" content="Tags" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <AlbumRenderer albums={data.albums} />
      </main>

      <ElidedPagination pathname={pathname} paginator={data.page} />
    </div>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug, page } = context.query;
  const res = await ServerSafeRequest().tags.get(
    slug as string,
    page as string
  );
  const data = res.data;

  // Pass data to the page via props
  return { props: { data } };
};

export default TagDetail;
