import { ExternalLink, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  category?: string;
}

const NewsCard = ({ id, title, summary, url, source, publishedAt, category }: NewsCardProps) => {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Agora mesmo";
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getCategory = () => {
    if (category) return category;
    
    // Auto-categorize based on content
    const text = (title + " " + summary).toLowerCase();
    if (text.includes("prefeito") || text.includes("vereador") || text.includes("política")) return "Política";
    if (text.includes("saúde") || text.includes("hospital")) return "Saúde";
    if (text.includes("esporte") || text.includes("futebol")) return "Esportes";
    if (text.includes("cultura") || text.includes("festival")) return "Cultura";
    if (text.includes("economia") || text.includes("emprego")) return "Economia";
    return "Cotidiano";
  };

  return (
    <article className="news-card group transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      <div className="flex flex-col h-full">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="news-category">
            <Tag className="h-3 w-3 mr-1" />
            {getCategory()}
          </Badge>
          <div className="flex items-center text-news-meta text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(publishedAt)}
          </div>
        </div>

        {/* Title */}
        <h2 className="news-headline group-hover:text-primary transition-colors duration-200">
          <button 
            onClick={() => navigate(`/noticia/${id}`)}
            className="block hover:underline text-left w-full"
          >
            {title}
          </button>
        </h2>

        {/* Summary */}
        <p className="news-summary flex-grow">
          {summary}
        </p>

        {/* Footer */}
        <div className="news-meta justify-between">
          <span className="font-medium">{source}</span>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary-glow transition-colors"
          >
            Ler mais
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
