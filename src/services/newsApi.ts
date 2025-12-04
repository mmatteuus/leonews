import { NewsArticle } from "@/hooks/useNews";

const SPACEFLIGHT_BASE = "https://api.spaceflightnewsapi.net/v4/articles";

const localNews: NewsArticle[] = [
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
  {
    id: "local-3",
    title: "Política: Câmara municipal discute mobilidade urbana",
    summary:
      "Vereadores avaliam novos corredores de ônibus e ciclovias para reduzir congestionamentos.",
    url: "https://example.com/politica-mobilidade",
    source: "Câmara de Araguaína",
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "local-4",
    title: "Cultura: Festival gastronômico celebra sabores do Tocantins",
    summary:
      "Chefs locais apresentam releituras de pratos tradicionais em evento no centro da cidade.",
    url: "https://example.com/cultura-gastronomia",
    source: "Cultura TO",
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "local-5",
    title: "Esportes: Araguaína FC vence clássico regional por 2 a 1",
    summary:
      "Time garante vantagem na tabela e torcida lota estádio com apoio recorde.",
    url: "https://example.com/esportes-classico",
    source: "Esporte Norte",
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "local-6",
    title: "Saúde: Campanha de vacinação atinge 80% do público-alvo",
    summary:
      "Postos ampliam horário de atendimento para alcançar meta em Araguaína.",
    url: "https://example.com/saude-vacinacao",
    source: "Saúde TO",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "local-7",
    title: "Economia: Novas vagas abertas em polo industrial de Araguaína",
    summary:
      "Empresas anunciam contratações em logística e manufatura; inscrições já estão abertas.",
    url: "https://example.com/economia-vagas",
    source: "Jornal do Tocantins",
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
  },
];

const fetchLocalNews = (searchQuery: string = ""): NewsArticle[] => {
  if (!searchQuery) return localNews;

  return localNews.filter(
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
  url.searchParams.set("limit", "25");
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
    Promise.resolve(fetchLocalNews(searchQuery)),
  ]);

  const merged = [...apiArticles, ...localArticles];
  if (merged.length === 0) return localNews;

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
