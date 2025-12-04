import { Newspaper, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import araguainaHero from "@/assets/araguaina-hero.jpg";

const HeroSection = () => {
  return (
    <section className="hero-section relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${araguainaHero})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            LeoNews
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-95">
            O Portal de Notícias de Araguaína
          </p>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Acompanhe as principais notícias da cidade e região. Informação
            atualizada a cada hora, direto das melhores fontes locais.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Newspaper className="h-8 w-8 text-white/90" />
              </div>
              <div className="text-2xl font-bold">24h</div>
              <div className="text-sm opacity-90">Atualização contínua</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-8 w-8 text-white/90" />
              </div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">Foco em Araguaína</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-white/90" />
              </div>
              <div className="text-2xl font-bold">Local</div>
              <div className="text-sm opacity-90">Fontes confiáveis</div>
            </div>
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-transform duration-150 hover:-translate-y-0.5"
          >
            Ver últimas Notícias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
