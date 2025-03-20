"use client";

import { useEffect } from "react";
import { searchQuery, relatedArticleList } from "@/utils/fetchData";

type AiRecommandtionProps = {
  articleTitle: string;
  articleCategory: string;
};

export default function AiRecommandation({
  articleTitle,
  articleCategory,
}: AiRecommandtionProps) {
  useEffect(() => {
    if (articleCategory !== "development") return;

    async function getList() {
      const searchResult = await searchQuery(articleTitle);
      const result = await relatedArticleList(searchResult, articleTitle);

      console.log(result);
    }

    // getList();
  }, []);

  if (articleCategory !== "development") return null;
}
