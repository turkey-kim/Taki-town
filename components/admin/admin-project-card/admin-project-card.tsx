"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./admin-project-card.module.css";

export type AdminPostCardProps = {
  imageLink: string;
  title: string;
  summary: string;
  postLink: string;
};

export default function AdminProjectCard({
  imageLink,
  title,
  summary,
}: AdminPostCardProps) {
  return (
    <div>
      <Link href={"/" + title} className={styles["wrapper"]}>
        <div className={styles["image-wrapper"]}>
          <Image src={imageLink} alt={`Image ${title + 1}`} fill />
        </div>
        <h1 className={styles["title"]}>{title}</h1>
        <p className={styles["summary"]}>{summary}</p>
      </Link>
    </div>
  );
}
