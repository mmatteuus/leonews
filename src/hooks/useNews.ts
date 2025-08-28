import { useState, useEffect, useCallback } from 'react';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  createdAt?: string;
}

export const useNews = (searchQuery: string = '') => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll use mock data since this is a demonstration
      // In production, this would call your actual API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockNews: NewsArticle[] = [
        {
          id: '1',
          title: 'Prefeitura de Araguaína anuncia nova obra de infraestrutura no centro da cidade',
          summary: 'A administração municipal informou que iniciará em breve um projeto de revitalização urbana que beneficiará milhares de moradores da região central, incluindo melhorias no sistema de drenagem e pavimentação.',
          url: 'https://example.com/noticia-1',
          source: 'Portal Araguaína',
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        },
        {
          id: '2',
          title: 'Festival de Cultura Popular movimenta fim de semana em Araguaína',
          summary: 'O evento acontece na Praça das Bandeiras e reúne artistas locais, apresentações de dança folclórica e gastronomia típica da região norte. A entrada é gratuita para toda a família.',
          url: 'https://example.com/noticia-2',
          source: 'AF Notícias',
          publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        },
        {
          id: '3',
          title: 'Hospital Regional recebe novos equipamentos de alta tecnologia',
          summary: 'De acordo com a direção da unidade, os novos aparelhos vão melhorar significativamente o atendimento à população, reduzindo filas e aumentando a qualidade dos serviços médicos oferecidos.',
          url: 'https://example.com/noticia-3',
          source: 'Conexão Tocantins',
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        },
        {
          id: '4',
          title: 'Time de futebol local conquista importante vitória no campeonato estadual',
          summary: 'A equipe araguainense venceu por 3 a 1 e se aproxima da classificação para as semifinais. O técnico destacou o desempenho dos jogadores e o apoio da torcida local.',
          url: 'https://example.com/noticia-4',
          source: 'Portal O Norte',
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        },
        {
          id: '5',
          title: 'Assembleia Legislativa do Tocantins aprova projeto que beneficia municípios da região',
          summary: 'A proposta, que foi aprovada por unanimidade, destina recursos para melhorias na educação e saúde pública. Araguaína está entre as cidades contempladas pelo programa.',
          url: 'https://example.com/noticia-5',
          source: 'AL-TO',
          publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
        },
        {
          id: '6',
          title: 'Empresários locais participam de feira de negócios e inovação',
          summary: 'O evento promove o desenvolvimento econômico da região e apresenta oportunidades de investimento. Mais de 100 empresas estão participando do encontro no centro de convenções.',
          url: 'https://example.com/noticia-6',
          source: 'Folha do Tocantins',
          publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        }
      ];

      // Filter based on search query
      const filteredNews = searchQuery 
        ? mockNews.filter(article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.summary.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : mockNews;

      setArticles(filteredNews);
    } catch (err) {
      setError('Erro ao carregar notícias. Tente novamente em alguns instantes.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Auto-refresh every hour (3600000 ms)
  useEffect(() => {
    const interval = setInterval(fetchNews, 3600000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    articles,
    loading,
    error,
    refetch: fetchNews
  };
};