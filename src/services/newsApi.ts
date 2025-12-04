// Real News API Integration
// This service integrates NewsAPI + RSS (placeholder) + local mock fallback for Araguaína/TO

import { NewsArticle } from "@/hooks/useNews";

const NEWS_API_BASE_URL = "https://newsapi.org/v2";

const fetchLocalMockNews = (searchQuery: string = ""): NewsArticle[] => {
  const mockNews: NewsArticle[] = [
    {
      id: "1",
      title:
        "Prefeitura de Araguaína anuncia nova obra de infraestrutura no centro da cidade",
      summary:
        "A administração municipal informou que iniciará em breve um projeto de revitalização urbana que beneficiará milhares de moradores da região central, incluindo melhorias no sistema de drenagem e pavimentação.",
      url: "https://example.com/noticia-1",
      source: "Portal Araguaína",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      title: "Festival de Cultura Popular movimenta fim de semana em Araguaína",
      summary:
        "O evento acontece na Praça das Bandeiras e reúne artistas locais, apresentações de dança folclórica e gastronomia típica da região norte. A entrada é gratuita para toda a família.",
      url: "https://example.com/noticia-2",
      source: "AF Notícias",
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      title: "Hospital Regional recebe novos equipamentos de alta tecnologia",
      summary:
        "De acordo com a direção da unidade, os novos aparelhos vão melhorar significativamente o atendimento à população, reduzindo filas e aumentando a qualidade dos serviços médicos oferecidos.",
      url: "https://example.com/noticia-3",
      source: "Conexão Tocantins",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      title:
        "Araguaína FC conquista vitória importante no Campeonato Tocantinense",
      summary:
        "A equipe araguainense venceu por 2 a 0 no estádio Municipal e se aproxima da classificação para as semifinais. Técnico destaca evolução do time.",
      url: "https://example.com/noticia-4",
      source: "Portal O Norte",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      title:
        "Assembleia Legislativa aprova projeto que beneficia municípios do norte do Tocantins",
      summary:
        "A proposta aprovada por unanimidade destina recursos para melhorias na educação e saúde pública. Araguaína está entre as cidades contempladas.",
      url: "https://example.com/noticia-5",
      source: "AL-TO",
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "6",
      title:
        "Empresários participam de feira de negócios e inovação em Araguaína",
      summary:
        "O evento promove o desenvolvimento econômico da região e apresenta oportunidades de investimento. Mais de 100 empresas participam.",
      url: "https://example.com/noticia-6",
      source: "Folha do Tocantins",
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "7",
      title: "Nova linha de ônibus conecta bairros periféricos ao centro de Araguaína",
      summary:
        "A Secretaria de Transporte implementou nova rota que atende aos bairros Vila Couto e Setor Universitário, beneficiando mais de 3 mil moradores.",
      url: "https://example.com/noticia-7",
      source: "Portal Araguaína",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "8",
      title:
        "Universidade Federal do Tocantins oferece cursos gratuitos de capacitação",
      summary:
        "Campus de Araguaína abre inscrições para cursos de informática, inglês e empreendedorismo. São 200 vagas disponíveis para a comunidade.",
      url: "https://example.com/noticia-8",
      source: "UFT Araguaína",
      publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "9",
      title:
        "Campanha de vacinação contra gripe alcança 70% da meta em Araguaína",
      summary:
        "Secretaria de Saúde informa que mais de 35 mil pessoas já foram imunizadas. Postos de saúde funcionam em horário estendido.",
      url: "https://example.com/noticia-9",
      source: "Conexão Tocantins",
      publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "10",
      title:
        "Shopping de Araguaína inaugura nova ala com lojas e praça de alimentação",
      summary:
        "Expansão do centro comercial gera 150 novos empregos e traz marcas nacionais para a cidade. Inauguração acontece na próxima semana.",
      url: "https://example.com/noticia-10",
      source: "AF Notícias",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
  ];

  if (!searchQuery) return mockNews;

  return mockNews.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

const fetchFromNewsAPI = async (
  query: string = "Araguaína Tocantins"
): Promise<NewsArticle[]> => {
  const url = new URL(`${NEWS_API_BASE_URL}/everything`);
  url.searchParams.set("q", query);
  url.searchParams.set("language", "pt");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("apiKey", import.meta.env.VITE_NEWS_API_KEY || "");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch from NewsAPI");
  const data = await res.json();

  return (data.articles || []).map((article: any, index: number) => ({
    id: article.url || String(index),
    title: article.title,
    summary: article.description || "",
    url: article.url,
    source: article.source?.name || "NewsAPI",
    publishedAt: article.publishedAt || new Date().toISOString(),
  }));
};

// Placeholder until RSS parsing is re-enabled
const fetchRssArticles = async (): Promise<NewsArticle[]> => {
  return [];
};

export const fetchRealNews = async (
  searchQuery: string = ""
): Promise<NewsArticle[]> => {
  try {
    const [newsApiArticles, rssArticles] = await Promise.all([
      fetchFromNewsAPI(searchQuery || "Araguaína Tocantins").catch((err) => {
        console.error("NewsAPI error:", err);
        return [];
      }),
      fetchRssArticles().catch(() => []),
    ]);

    const localArticles = fetchLocalMockNews(searchQuery);
    const merged = [...newsApiArticles, ...rssArticles, ...localArticles];

    const unique = new Map(
      merged.map((article) => [article.url || article.id, article])
    );

    return Array.from(unique.values()).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Erro ao carregar notícias");
  }
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
