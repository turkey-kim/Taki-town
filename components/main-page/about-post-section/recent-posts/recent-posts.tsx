import styles from "./recent-posts.module.css";
import NavButton from "@/components/button/nav-button";
import Carousel from "@/components/carousel/carousel";

export default function RecentPosts() {
  return (
    <div className={styles["wrapper"]}>
      <header className={styles["header"]}>
        <h1 className={styles["title"]}>Recent posts</h1>
        <NavButton text="More Posts" size="small" link="/posts" />
      </header>
      <main className={styles["content-wrapper"]}>
        <Carousel />
      </main>
    </div>
  );
}