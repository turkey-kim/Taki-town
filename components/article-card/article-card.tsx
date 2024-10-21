"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./article-card.module.css";
import Image from "next/image";
import Link from "next/link";

export type ArticleCardProps = {
  imageLink: string;
  title: string;
  summary: string;
  postLink: string;
  articleSort: string;
};

export default function ArticleCard({
  imageLink,
  title,
  summary,
  articleSort,
}: ArticleCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const path = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [path]);

  return (
    <Link
      href={`/${articleSort}/${title}`}
      className={`${styles["wrapper"]} ${isVisible ? styles.visible : ""}`}
      ref={cardRef}
    >
      <div className={styles["image-wrapper"]}>
        <Image src={imageLink} alt={`Image ${title + 1}`} fill />
      </div>
      <h1 className={styles["title"]}>{title}</h1>
      <p className={styles["summary"]}>{summary}</p>
    </Link>
  );
}