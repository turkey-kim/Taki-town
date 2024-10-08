import MainLogo from "../main-logo/main-logo";
import HeaderList from "./heade-list";
import ThemeChangeButton from "./theme-change-button/theme-change-button";
import styles from "./header.module.css";
import LogOutButton from "./logout-button/log-out-button";

export default function Header() {
  return (
    <header className={styles.header}>
      <MainLogo link="/" title="TAKI-TOWN" />
      <nav className={styles.navbar}>
        <ul className={styles.navbar}>
          <HeaderList href="/posts" listName="posts" />
          <HeaderList href="/portfolit" listName="portfolio" />
          <HeaderList href="/about" listName="about" />
          <LogOutButton />
          <ThemeChangeButton />
        </ul>
      </nav>
    </header>
  );
}
