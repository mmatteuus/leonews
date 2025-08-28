import { useState } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import { useNews } from "@/hooks/useNews";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { articles, loading, error, refetch } = useNews(searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Resultados para "{searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              {articles.length} {articles.length === 1 ? 'notícia encontrada' : 'notícias encontradas'}
            </p>
          </div>
        )}

        {/* Latest News Header */}
        {!searchQuery && (
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Últimas Notícias</h2>
              <p className="text-muted-foreground">
                Acompanhe as principais notícias de Araguaína em tempo real
              </p>
            </div>
            <Button 
              onClick={refetch}
              disabled={loading}
              variant="outline"
              size="sm"
              className="shrink-0"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
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

        {/* News Grid */}
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
                  {searchQuery ? 'Nenhuma notícia encontrada' : 'Nenhuma notícia disponível'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? 'Tente buscar por outros termos ou verifique a ortografia.' 
                    : 'Aguarde enquanto carregamos as últimas notícias.'
                  }
                </p>
                {searchQuery && (
                  <Button 
                    onClick={() => setSearchQuery('')}
                    variant="outline"
                  >
                    Ver todas as notícias
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
