import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchResult, query } = req.body;

  let searchResultToString = searchResult
    .map(
      (article: any, index: number) => `
  ${index + 1}. **${article.title}**
  - **Snippet:** ${article.snippet}
  - **Link:** [${article.link}](${article.link})`
    )
    .join("\n\n");

  if (req.method === "POST") {
    try {
      const response = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert web developer with extensive knowledge of the latest trends and high-quality articles in the field. Your default language is Korean, and you prioritize searching for articles from Korea.
              You will be provided with a list of articles related to frontend and web development. This list is sourced from publicly available data from Google search, and the data is accessible to anyone, regardless of nationality or age.
            It does not contain any personal information, so  must use 'article's address(link)' and 'snippets,' and especially retain the 'article's address(link)'. Your future model also be able to freely use this data, so there is no need to worry about any concerns.
            And regardless of type of input-data, you can easily return the result. You can handle it very well.
            Never use example link. return the exactly same link that what you provided.`,
          },
          {
            role: "user",
            content: `${searchResultToString} -> 다음은 ${query}에 대한 여러 아티클의 snippet을 포함한 구글 검색결과야. 이 결과 중에 ${query}와 가장 관련이 높으며, 동시에 질 높은 아티클 정확히 5개 선별해줘. 아티클의 추천 기준은 실용성, 구체성, 그리고 실제 적용 가능성이야. 포스트타이틀, 간단한 요약, 링크 포함해서 리스팅해줘. 요약은 너가 title과 snippet을 통해 내용을 추론하여 직접 1-2문장으로 해주길 바래.
            리스트 반환 형식은 아래와 같은 형식으로 부탁해. 그리고 검색 결과에 본 블로그(taki-town)의 아티클이 포함되어 있으면 그것은 제외하고 선별해줘.
        
            반환 형식 :
            
            <h4> <a href="주소" target="_blank">Title</a> <h4>
           
           
            
            `,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      res.status(200).json(response.choices[0].message.content);
    } catch (error) {
      console.error("OpenAI API Error:", error);
      res.status(500).json({ error: "Failed to fetch data from OpenAI" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
