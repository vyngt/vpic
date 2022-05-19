import { AlbumListPage, Album } from "../../../models";
import Image from "next/image";
import Link from "next/link";

const ManagerHeader = () => {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">My Albums</h1>
          <p className="lead text-muted">Create and manage your albums.</p>
          <p>
            <Link href="/control/album/create">
              <a className="btn btn-primary my-2">Create a new album</a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

const ManagerElement = ({ album }: { album: Album }) => {
  const album_link = `/albums/${album.id}`;
  return (
    <>
      <div className="col">
        <div className="card shadow-sm" style={{ background: "#4a273d" }}>
          <div>
            <Image
              className="bd-placeholder-img card-img-top"
              src={album.cover}
              width="100%"
              height="100%"
              unoptimized={true}
              layout="responsive"
              objectFit="contain"
              alt={album.name}
            />
          </div>

          <div className="card-body">
            <p className="card-text">
              Name: {album.name}
              <br />
              Tags: {album.tags.map((a) => a.name).join(", ")}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <Link href={album_link}>
                  <a className="btn btn-sm btn-outline-secondary">View</a>
                </Link>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AlbumManager = ({ data }: { data: AlbumListPage }) => {
  return (
    <>
      <ManagerHeader />
      <div className="album py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {data.albums.map((album) => (
              <ManagerElement key={album.id} album={album} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
