import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const TagDetail = () => {
  const pathname = "/tags/[slug]/page/[page]";
  const router = useRouter();
  useEffect(() => {
    router.replace({
      pathname: pathname,
      query: { slug: router.query.slug, page: 1 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Head>
        <title>Loading</title>
        <meta name="description" content="Tags" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </div>
  );
};

export default TagDetail;
