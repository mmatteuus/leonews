import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Clock, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NewsArticle } from "@/hooks/useNews";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock detailed article data - in production, fetch from your API
        const mockArticles: Record<string, NewsArticle & { content: string; tags: string[] }> = {
          '1': {
            id: '1',
            title: 'Prefeitura de Araguaína anuncia nova obra de infraestrutura no centro da cidade',
            summary: 'A administração municipal informou que iniciará em breve um projeto de revitalização urbana que beneficiará milhares de moradores da região central, incluindo melhorias no sistema de drenagem e pavimentação.',
            content: `A Prefeitura de Araguaína anunciou oficialmente nesta terça-feira (27) o início das obras de revitalização do centro da cidade, um projeto orçado em R$ 2,5 milhões que promete transformar a região central da cidade.\n\nSegundo o prefeito municipal, as obras incluem a modernização do sistema de drenagem pluvial, recapeamento asfáltico de 15 ruas principais e a instalação de nova iluminação LED em toda a área central.\n\n"Este é um projeto que a população araguainense esperava há muito tempo. Vamos modernizar completamente a infraestrutura do nosso centro, proporcionando mais qualidade de vida para os moradores e comerciantes da região", declarou o prefeito em coletiva de imprensa.\n\nAs obras devem começar na próxima segunda-feira (3) e têm previsão de conclusão em 180 dias. Durante o período de execução, algumas ruas poderão ter o trânsito alterado, mas a prefeitura garante que o acesso ao comércio local será mantido.\n\nO projeto também prevê a criação de novas vagas de estacionamento e a revitalização da Praça das Bandeiras, um dos pontos turísticos mais importantes da cidade.\n\nA empresa responsável pelas obras já iniciou a mobilização dos equipamentos e a contratação de mão de obra local, gerando cerca de 80 empregos diretos durante o período de execução.`,
            url: 'https://example.com/noticia-1',
            source: 'Portal Araguaína',
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            tags: ['Infraestrutura', 'Obras Públicas', 'Centro da Cidade', 'Prefeitura']
          },
          '2': {
            id: '2',
            title: 'Festival de Cultura Popular movimenta fim de semana em Araguaína',
            summary: 'O evento acontece na Praça das Bandeiras e reúne artistas locais, apresentações de dança folclórica e gastronomia típica da região norte. A entrada é gratuita para toda a família.',
            content: `O tradicional Festival de Cultura Popular de Araguaína está movimentando o fim de semana na Praça das Bandeiras, reunindo milhares de pessoas em celebração às tradições culturais do Tocantins.\n\nO festival, que começou na sexta-feira (25) e se estende até domingo (28), conta com apresentações de grupos folclóricos locais, exposição de artesanato regional e uma praça de alimentação com pratos típicos da culinária tocantinense.\n\n"É emocionante ver nossa cultura sendo valorizada e preservada dessa forma. O festival não apenas entretém, mas também educa as novas gerações sobre nossas tradições", comentou a secretária municipal de Cultura.\n\nEntre as atrações principais estão apresentações de catira, quadrilha, bumba meu boi e música sertaneja raiz. O palco principal recebe shows a partir das 19h, mas as atividades culturais começam às 15h com oficinas de artesanato para crianças.\n\nA gastronomia é outro destaque do evento, com barracas oferecendo pacu assado, farofa de banana, pequi, cupuaçu e outras iguarias regionais. Todos os pratos são preparados por grupos comunitários locais.\n\nA organização espera receber mais de 10 mil visitantes durante os três dias de festival. A entrada é gratuita e a programação completa pode ser consultada no site da prefeitura.\n\nO Festival de Cultura Popular de Araguaína é realizado anualmente desde 2015 e já se tornou um dos eventos mais esperados do calendário cultural da cidade.`,
            url: 'https://example.com/noticia-2',
            source: 'AF Notícias',
            publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            tags: ['Cultura', 'Festival', 'Tradições', 'Entretenimento']
          },
          '3': {
            id: '3',
            title: 'Hospital Regional recebe novos equipamentos de alta tecnologia',
            summary: 'De acordo com a direção da unidade, os novos aparelhos vão melhorar significativamente o atendimento à população, reduzindo filas e aumentando a qualidade dos serviços médicos oferecidos.',
            content: `O Hospital Regional de Araguaína recebeu na manhã desta quarta-feira (28) um investimento de R$ 1,8 milhão em novos equipamentos médicos, representando um importante avanço na qualidade dos serviços de saúde oferecidos à população.\n\nEntre os equipamentos adquiridos estão um aparelho de ressonância magnética de última geração, dois novos aparelhos de ultrassom com tecnologia 4D, e um sistema de raio-X digital que permitirá diagnósticos mais rápidos e precisos.\n\n"Este investimento representa uma revolução no atendimento que oferecemos. Com esses novos equipamentos, conseguiremos reduzir significativamente o tempo de espera para exames e oferecer diagnósticos muito mais precisos", explicou o diretor médico do hospital.\n\nA nova ressonância magnética, por exemplo, tem capacidade para realizar exames em metade do tempo dos equipamentos anteriores, além de oferecer imagens com resolução superior. Isso significa que mais pacientes poderão ser atendidos diariamente.\n\nO hospital também inaugurou um novo centro de diagnóstico por imagem, com instalações modernas e climatizadas, proporcionando maior conforto aos pacientes durante a realização dos exames.\n\nSegundo a administração, os novos equipamentos já estão em funcionamento e devem beneficiar cerca de 15 mil pacientes mensalmente, não apenas de Araguaína, mas de toda a região norte do Tocantins.\n\nO investimento foi viabilizado através de uma parceria entre o governo estadual e federal, demonstrando o compromisso com a melhoria da saúde pública na região.`,
            url: 'https://example.com/noticia-3',
            source: 'Conexão Tocantins',
            publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            tags: ['Saúde', 'Hospital', 'Equipamentos', 'Tecnologia']
          }
        };

        const foundArticle = mockArticles[id || ''];
        if (!foundArticle) {
          setError('Notícia não encontrada');
          return;
        }

        setArticle(foundArticle);
      } catch (err) {
        setError('Erro ao carregar a notícia');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategory = (title: string, summary: string) => {
    const text = (title + " " + summary).toLowerCase();
    if (text.includes("prefeito") || text.includes("vereador") || text.includes("política")) return "Política";
    if (text.includes("saúde") || text.includes("hospital")) return "Saúde";
    if (text.includes("esporte") || text.includes("futebol")) return "Esportes";
    if (text.includes("cultura") || text.includes("festival")) return "Cultura";
    if (text.includes("economia") || text.includes("emprego")) return "Economia";
    return "Cotidiano";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery="" onSearchChange={() => {}} />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-20 mb-4"></div>
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/3 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery="" onSearchChange={() => {}} />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Notícia não encontrada</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery="" onSearchChange={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar às notícias
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="news-category">
                <Tag className="h-3 w-3 mr-1" />
                {getCategory(article.title, article.summary)}
              </Badge>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(article.publishedAt)}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {article.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium">{article.source}</span>
              </div>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-glow transition-colors"
              >
                Ver matéria original
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="text-foreground leading-relaxed space-y-6">
              {(article as any).content?.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-base leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Tags */}
          {(article as any).tags && (
            <div className="mt-12 pt-6 border-t">
              <h3 className="text-sm font-medium mb-3">Tags relacionadas:</h3>
              <div className="flex flex-wrap gap-2">
                {(article as any).tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Publicado por <span className="font-medium">{article.source}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {formatDate(article.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;