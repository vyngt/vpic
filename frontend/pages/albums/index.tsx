import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AlbumList = () => {
  const pathname = "/albums/page/[page]";
  const router = useRouter();
  useEffect(() => {
    router.replace({ pathname: pathname, query: { page: 1 } });
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

export default AlbumList;
