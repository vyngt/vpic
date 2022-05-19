import Link from "next/link";
import { useRouter } from "next/router";
import { BaseQuery, PagePaginator, PageElidedPaginator } from "../../models";

export const FullPaginationButton = ({
  query,
  current,
  p,
}: {
  query: BaseQuery;
  current: number;
  p: number | undefined;
}) => {
  query.query.page = p ? p : 1;

  return current == p ? (
    <li className="page-item active" aria-current="page">
      <span className="page-link">{p}</span>
    </li>
  ) : (
    <li className="page-item">
      <Link
        href={{
          pathname: query.pathname,
          query: query.query,
        }}
      >
        <a className="page-link">{p}</a>
      </Link>
    </li>
  );
};

/**
 * @param pathname
 * @returns
 * `For the filename: "/albums/[id]/page/[page].tsx"`
 *
 * `The pathname should: "/albums/[id]/page/[page]"`
 */
export const FullPagination = ({
  pathname,
  paginator,
}: {
  pathname: string;
  paginator: PagePaginator;
}) => {
  const router = useRouter();
  const { ...props } = router.query;
  const query: BaseQuery = { pathname: pathname, query: props };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <ul className="pagination d-flex flex-wrap">
          {paginator.range.map((p) => (
            <FullPaginationButton
              key={p}
              query={query}
              current={paginator.current}
              p={p}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

// ==============================================

export const ElidedPaginationButton = ({
  query,
  current,
  num_pages,
  p,
}: {
  query: BaseQuery;
  current: number;
  num_pages: number;
  p: number | string | undefined;
}) => {
  query.query.page = p ? p : 1;
  return typeof p === "string" ? (
    <li className="page-item disabled">
      <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
        …
      </a>
    </li>
  ) : p === current && p === 1 ? (
    <li className="page-item active" aria-current="page">
      <span className="page-link">First</span>
    </li>
  ) : p === current && p === num_pages ? (
    <li className="page-item active" aria-current="page">
      <span className="page-link">Last</span>
    </li>
  ) : p === current ? (
    <li className="page-item active" aria-current="page">
      <span className="page-link">{p}</span>
    </li>
  ) : p === 1 ? (
    <li className="page-item">
      <Link
        href={{
          pathname: query.pathname,
          query: query.query,
        }}
      >
        <a className="page-link">First</a>
      </Link>
    </li>
  ) : p === num_pages ? (
    <li className="page-item">
      <Link
        href={{
          pathname: query.pathname,
          query: query.query,
        }}
      >
        <a className="page-link">Last</a>
      </Link>
    </li>
  ) : (
    <li className="page-item">
      <Link
        href={{
          pathname: query.pathname,
          query: query.query,
        }}
      >
        <a className="page-link">{p}</a>
      </Link>
    </li>
  );
};

export const ElidedPagination = ({
  pathname,
  paginator,
}: {
  pathname: string;
  paginator: PageElidedPaginator;
}) => {
  const router = useRouter();
  const { ...props } = router.query;
  const query: BaseQuery = { pathname: pathname, query: props };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <ul className="pagination d-flex flex-wrap">
          {paginator.elided_pages.map((pag, i) => (
            <ElidedPaginationButton
              key={i}
              query={query}
              current={paginator.current}
              p={pag}
              num_pages={paginator.num_pages}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
