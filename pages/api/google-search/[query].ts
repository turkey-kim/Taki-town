import { NextApiRequest, NextApiResponse } from "next";

export default async function searchQuery(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { query } = req.query;
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
          query as string
        )}&key=${process.env.GOOGLE_API_SECRET}&cx=${
          process.env.SEARCH_ENGINE_ID
        }&num=10&dateRestrict=y3`
      );

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: `Error ${response.status} - ${response.statusText}` });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Fail to fetch data" });
    }
  }
}
