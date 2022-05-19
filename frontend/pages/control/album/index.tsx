import Head from "next/head";
import { AlbumListPage } from "../../../models";
import { AlbumManager } from "../../../components/control/album";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AlbumActionIndex = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace({
      pathname: "/control/album/page/[page]",
      query: { page: 1 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Loading...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
};

export default AlbumActionIndex;
