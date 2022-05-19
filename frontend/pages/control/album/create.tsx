import Head from "next/head";
import { ServerSafeRequest } from "../../../app/request";
import { AlbumCreationForm } from "../../../components/control/album";
import { TagListPage } from "../../../models";

const AlbumCreation = ({ data }: { data: TagListPage }) => {
  return (
    <>
      <Head>
        <title>Album Creator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AlbumCreationForm tags={data.tags} />
    </>
  );
};

export async function getServerSideProps() {
  const res = await ServerSafeRequest().tags.list();
  const data = res.data;

  return { props: { data } };
}

export default AlbumCreation;
