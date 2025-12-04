import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-text))] mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Sobre o LeoNews</h3>
            <p className="text-sm opacity-90 mb-4">
              O portal de notícias mais completo de Araguaína, Tocantins. 
              Oferecemos cobertura local 24 horas por dia com informações 
              confiáveis e atualizadas.
            </p>
            <div className="text-xs opacity-75">
              Jornalismo profissional para Araguaína
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Política</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Cotidiano</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Cultura</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Esportes</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Economia</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Saúde</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contato</h3>
            <div className="space-y-3">
              <a 
                href="https://wa.me/5563992476987" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm hover:text-secondary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp: (63) 99247-6987</span>
              </a>
              
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>contato@leonews.com.br</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <span className="font-semibold">LeoNews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
            <p>&copy; 2024 LeoNews. Todos os direitos reservados.</p>
            <p className="mt-2 md:mt-0">
              Desenvolvido por <span className="font-semibold text-secondary">MtsFerreira</span> • 
              WhatsApp: <a href="https://wa.me/5563992476987" className="hover:text-secondary">(63) 99247-6987</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
