import { NewsArticle } from "@/hooks/useNews";

const SPACEFLIGHT_BASE = "https://api.spaceflightnewsapi.net/v4/articles";

const fetchLocalMockNews = (searchQuery: string = ""): NewsArticle[] => {
  const mockNews: NewsArticle[] = [
    {
      id: "local-1",
      title:
        "Mutirão de serviços chega aos bairros de Araguaína neste fim de semana",
      summary:
        "A prefeitura leva atendimentos de saúde, cadastro social e limpeza urbana para moradores das regiões sul e oeste.",
      url: "https://example.com/mutirao-araguaina",
      source: "Portal Araguaína",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "local-2",
      title: "Feira de Empreendedores movimenta a economia local",
      summary:
        "Evento reúne pequenos negócios e artesãos para fomentar a geração de renda em Araguaína.",
      url: "https://example.com/feira-empreendedores",
      source: "Economia TO",
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ];

  if (!searchQuery) return mockNews;
  return mockNews.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

const fetchFromSpaceflight = async (
  query: string = "Brazil"
): Promise<NewsArticle[]> => {
  const url = new URL(SPACEFLIGHT_BASE);
  url.searchParams.set("search", query);
  url.searchParams.set("limit", "20");
  url.searchParams.set("ordering", "-published_at");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch from Spaceflight News API");
  const data = await res.json();
  const items = data.results || [];

  return items.map((article: any, index: number) => ({
    id: String(article.id ?? index),
    title: article.title,
    summary: article.summary || "",
    url: article.url,
    source: article.news_site || "Spaceflight News",
    publishedAt: article.published_at || new Date().toISOString(),
  }));
};

export const fetchRealNews = async (
  searchQuery: string = ""
): Promise<NewsArticle[]> => {
  const q = searchQuery || "Araguaina Tocantins";
  const [apiArticles, localArticles] = await Promise.all([
    fetchFromSpaceflight(q).catch((err) => {
      console.error("Spaceflight API error:", err);
      return [];
    }),
    Promise.resolve(fetchLocalMockNews(searchQuery)),
  ]);

  const merged = [...apiArticles, ...localArticles];
  const unique = new Map(
    merged.map((article) => [article.url || article.id, article])
  );

  return Array.from(unique.values()).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const fetchArticleById = async (
  id: string
): Promise<NewsArticle | null> => {
  try {
    const allNews = await fetchRealNews();
    return allNews.find((article) => article.id === id) || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};
