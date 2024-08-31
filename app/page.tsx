"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Introduction from "@/components/main-page/introduction";

export default function Home() {
  const [data, setData] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.name);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <Introduction />
    </main>
  );
}
