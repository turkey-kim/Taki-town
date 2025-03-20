import {
  CommentProps,
  PostCountProps,
  PostDataProps,
  ProjectDataProps,
} from "@/type";
import { STALE_TIME } from "@/constant";

// posts

export async function fetchPostList(): Promise<PostDataProps[]> {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/api/post/get-all-posts`,
    { next: { revalidate: STALE_TIME } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

export async function fetchProjectList(): Promise<ProjectDataProps[]> {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/api/project/get/get-all-projects`,
    { next: { revalidate: STALE_TIME } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function fetchPostData(postTitle: string) {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/api/post/${postTitle}`,
    { next: { revalidate: STALE_TIME } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function fetchProjectData(projectTitle: string) {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/api/project/get/${projectTitle}`,
    { next: { revalidate: STALE_TIME } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function fetchPostCount(
  postCategory: string
): Promise<PostCountProps> {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/api/post-counter/get/${postCategory}`,
    { next: { revalidate: STALE_TIME } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function createPost(formData: PostDataProps) {
  // update Counter
  await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/post-counter/patch/increase`,
    {
      method: "PATCH",
      body: JSON.stringify(formData.category),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const recentCount: PostCountProps = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/post-counter/get/${formData.category}`,
    { next: { revalidate: STALE_TIME } }
  ).then((res) => res.json());

  formData.postNumber = recentCount.count;

  alert(process.env.PUBLIC_URL);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/post/create-post`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
}

// comments

export async function submitNewComment(commentFormData: any) {
  await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/comment/create/create-comment`,
    {
      method: "POST",
      body: JSON.stringify(commentFormData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function editComment(commentFormData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/comment/edit/edit-comment`,
      {
        method: "PATCH",
        body: JSON.stringify(commentFormData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    switch (response.status) {
      case 200:
        return { success: true, code: 200 };
      case 401:
        return { success: false, code: 401 };
      case 500:
        return { success: false, code: 500 };
      default:
        return { success: false, code: 500 };
    }
  } catch (error) {
    return { success: false, code: 500 };
  }
}

export async function getAllComments() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/comment/get/get-all-comments`
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch comments: ${response.status} ${response.statusText}`
      );
      return null;
    }

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("An error occurred while fetching comments:", error);
    return null;
  }
}

export async function updateRecomment(commentId: string, commentFormData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/recomment/create/${commentId}`,
      {
        method: "PATCH",
        body: JSON.stringify(commentFormData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch recomment");
    }
  } catch (error) {
    console.error("An error occurred while fetching recomment:", error);
    return null;
  }
}

export async function searchQuery(query: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/google-search/${query}`,
      { method: "GET" }
    );

    switch (response.status) {
      case 200: {
        const data = await response.json();
        return data.items.map((item: any) => {
          return {
            title: item.title,
            link: item.link,
            snippet: item.snippet,
          };
        });
      }
      case 400:
        throw new Error("400 Bad Request: 요청이 잘못되었습니다.");
      case 401:
        throw new Error("401 Unauthorized: 인증이 필요합니다.");
      case 403:
        throw new Error(
          "403 Forbidden: 접근이 금지되었습니다. 할당량이 초과되거나, 권한이 없습니다."
        );
      case 404:
        throw new Error("404 Not Found: 해당 리소스를 찾을 수 없습니다.");
      case 429:
        throw new Error("429 Too Many Request: 요청 횟수가 초과되었습니다.");
      case 500:
        throw new Error(
          "500 Internal Server Error: 서버에서 오류가 발생했습니다."
        );
      default:
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function relatedArticleList(
  searchResult: Array<any>,
  query: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/openai/getRelatedArticles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchResult, query }),
      }
    );

    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
}
