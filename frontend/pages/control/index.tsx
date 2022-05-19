import Head from "next/head";
import Link from "next/link";

const Content = () => {
  return (
    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Select one</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          <h2>My Albums</h2>
          <p>Create and manage your album</p>
          <Link href="/control/album">
            <a className="icon-link">Select</a>
          </Link>
        </div>
        <div className="feature col">
          <h2>My Crawler Filter</h2>
          <p>Create your own custom filter to ... crawler web</p>
          <a href="#" className="icon-link">
            Coming soon
          </a>
        </div>
      </div>
    </div>
  );
};

const ControllerIndex = () => {
  return (
    <>
      <Head>
        <title>Controller</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Content />
    </>
  );
};

export default ControllerIndex;
