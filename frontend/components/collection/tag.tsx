import Link from "next/link";
import { Tag } from "../../models";

export const TagElement = ({ tag }: { tag: Tag }) => {
  const tag_uri = `/tags/${tag.slug}`;
  return (
    <div className="p-1">
      <Link href={tag_uri}>
        <a className="btn btn-outline-info ms-1" role="button">
          {tag.name}
        </a>
      </Link>
    </div>
  );
};
