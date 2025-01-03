import styles from "./layout.module.css";
import PostsHeader from "@/components/posts/header/posts-header";
import PostList from "@/components/posts/post-list/post-list";
import { fetchPostList } from "@/utils/fetchData";
import { MetadataComponent } from "@/components/metadata/metadata";

export const generateMetadata = () => MetadataComponent({ page: "Posts" });

export default async function PostLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const dataList = await fetchPostList();
  const pathname = params.id;

  return (
    <div className={styles["wrapper"]}>
      {children}
      <PostsHeader pathname={pathname} />
      <PostList dataList={dataList} />
    </div>
  );
}
