import { useRouter } from "next/router";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export const UserNavigator = ({ session }: { session: Session }) => {
  const router = useRouter();
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light dropdown-toggle"
        type="button"
        id="profile_dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {session.user?.name}
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end user-navigator"
        aria-labelledby="profile_dropdown"
      >
        <li>
          <button
            type="button"
            onClick={() => router.push("/control")}
            className="dropdown-item user-navigator"
          >
            Control
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => signOut()}
            className="dropdown-item user-navigator"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
