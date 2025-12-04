import { useEffect, useState } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNews } from "@/hooks/useNews";

interface CategoryPageProps {
  title: string;
  description: string;
  query: string;
}

const CategoryPage = ({ title, description, query }: CategoryPageProps) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const { articles, loading, error, refetch } = useNews(searchQuery);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button
            onClick={refetch}
            disabled={loading}
            variant="outline"
            size="sm"
            className="shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Atualizar
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="news-card animate-pulse">
                <div className="h-4 bg-muted rounded w-20 mb-3"></div>
                <div className="h-6 bg-muted rounded mb-3"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <>
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <NewsCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    summary={article.summary}
                    url={article.url}
                    source={article.source}
                    publishedAt={article.publishedAt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">
                  Nenhuma notícia encontrada
                </h3>
                <p className="text-muted-foreground mb-4">
                  Aguarde enquanto carregamos as notícias desta categoria.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
