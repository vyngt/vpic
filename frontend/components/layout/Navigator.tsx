import styles from "../../styles/Navigator.module.css";
import Link from "next/link";

interface NavigationButton {
  link: string;
  name: string;
}

const NAVIGATION: NavigationButton[] = [
  {
    link: "/albums",
    name: "Albums",
  },
  {
    link: "/tags",
    name: "Sets",
  },
  {
    link: "/crawler",
    name: "Crawler",
  },
];

const NavigatorElement = () => {
  return (
    <>
      {NAVIGATION.map((btn) => (
        <li key={btn.name}>
          <Link href={btn.link}>
            <a className="nav-link">{btn.name}</a>
          </Link>
        </li>
      ))}
    </>
  );
};

export default function Navigator() {
  return (
    <ul
      className={`nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 navigator-link ${styles["navigator-link"]}`}
    >
      <NavigatorElement />
    </ul>
  );
}
