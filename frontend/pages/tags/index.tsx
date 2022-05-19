import Head from "next/head";
import { ServerSafeRequest } from "../../app/request";
import { TagListPage } from "../../models";
import { TagElement } from "../../components/collection/tag";

const TagList = ({ data }: { data: TagListPage }) => {
  return (
    <>
      <Head>
        <title>Tags</title>
        <meta name="description" content="Tags" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container-fluid">
        <div className="d-flex flex-wrap">
          {data.tags.map((tag) => (
            <TagElement key={tag.id} tag={tag} />
          ))}
        </div>
      </div>
    </>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  const res = await ServerSafeRequest().tags.list();
  const data = res.data;

  return { props: { data } };
}

export default TagList;
