import Link from "next/link";
import { AuthComponent } from "../auth";
import Navigator from "./Navigator";

export const Header = () => {
  return (
    <header className="bd-header bg-dark py-3 d-flex align-items-stretch border-bottom border-dark">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link href="/">
            <a className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none h3">
              VPic
            </a>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <Navigator />
          </ul>

          <div className="text-end">
            <AuthComponent />
          </div>
        </div>
      </div>
    </header>
  );
};
