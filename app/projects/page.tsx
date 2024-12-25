import styles from "./page.module.css";
import ProjectsHeader from "@/components/projects/header/projects-header";
import ProjectList from "@/components/projects/list/project-list";
import { fetchProjectList } from "@/utils/fetchData";
import { MetadataComponent } from "@/components/metadata/metadata";

export const generateMetadata = () => MetadataComponent({ page: "Projects" });

export default async function Projects() {
  const dataList = await fetchProjectList();

  return (
    <div className={styles["wrapper"]}>
      <ProjectsHeader />
      <ProjectList cardList={dataList} />
    </div>
  );
}
