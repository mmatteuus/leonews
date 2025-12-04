import { useState } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import WeatherCard from "@/components/WeatherCard";
import Footer from "@/components/Footer";
import { useNews } from "@/hooks/useNews";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { articles, loading, error, refetch } = useNews(searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <HeroSection />

      <section className="container mx-auto px-4 mt-6">
        <WeatherCard />
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Resultados para "{searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              {articles.length}{" "}
              {articles.length === 1
                ? "notícia encontrada"
                : "notícias encontradas"}
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
              className="shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
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
                  {searchQuery
                    ? "Nenhuma notícia encontrada"
                    : "Nenhuma notícia disponível"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Tente buscar por outros termos ou verifique a ortografia."
                    : "Aguarde enquanto carregamos as últimas notícias."}
                </p>
                {searchQuery && (
                  <Button
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                    className="transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    Ver todas as notícias
                  </Button>
                )}
              </div>
            )}
          </>
        )}

        <section
          id="contato"
          className="mt-16 mb-24 max-w-2xl mx-auto w-full notranslate"
          translate="no"
        >
          <h2 className="text-2xl font-bold mb-4">Envie uma notícia</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sugira uma pauta, envie um flagrante ou compartilhe um evento
            importante de Araguaína.
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Formulário enviado (simulação sem backend).");
            }}
          >
            <div>
              <label className="text-sm font-medium block mb-1">Seu nome</label>
              <input
                type="text"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">E-mail</label>
              <input
                type="email"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">
                Título da notícia
              </label>
              <input
                type="text"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Descrição</label>
              <textarea
                required
                rows={4}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-transform duration-150 hover:-translate-y-0.5"
            >
              Enviar sugestão
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
