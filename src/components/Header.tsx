import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { label: "Início", path: "/" },
    { label: "Política", path: "/politica" },
    { label: "Cotidiano", path: "/cotidiano" },
    { label: "Cultura", path: "/cultura" },
    { label: "Esportes", path: "/esportes" },
    { label: "Economia", path: "/economia" },
    { label: "Saúde", path: "/saude" },
  ];

  return (
    <header className="header-sticky">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
              📰
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">LeoNews</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Portal de Araguaína
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar notícias em Araguaína..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Desktop Categories */}
            <nav className="hidden lg:flex items-center space-x-1">
              {categories.map((category) => (
                <Link key={category.path} to={category.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium hover:text-primary transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    {category.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar notícias..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Mobile Categories */}
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link key={category.path} to={category.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-sm font-medium w-full"
                  >
                    {category.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
