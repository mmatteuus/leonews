import { useState, useEffect, useCallback } from 'react';
import { fetchRealNews } from '@/services/newsApi';

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
      
      // Simulate API delay for realistic loading
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use the real news service
      const newsData = await fetchRealNews(searchQuery);
      setArticles(newsData);
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