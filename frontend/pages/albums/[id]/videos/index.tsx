import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const pathname = "/albums/[id]/videos/[page]";
  const router = useRouter();
  useEffect(() => {
    router.replace({
      pathname: pathname,
      query: { id: router.query.id, page: 1 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Loading...</title>
        <meta name="description" content="Album List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
};

export default Index;
