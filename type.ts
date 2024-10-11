export type PostDataProps = {
  title: string;
  summary: string;
  imageLink: string;
  category: string;
  tags: string;
  content: string;
  date: string;
};

export type ThemeContextProps = {
  theme: string;
  toggleTheme: () => void;
};
