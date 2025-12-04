import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import Politica from "./pages/Politica";
import Cotidiano from "./pages/Cotidiano";
import Cultura from "./pages/Cultura";
import Esportes from "./pages/Esportes";
import Saude from "./pages/Saude";
import Economia from "./pages/Economia";
import BackToTopButton from "./components/BackToTopButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/noticia/:id" element={<NewsDetail />} />
          <Route path="/politica" element={<Politica />} />
          <Route path="/cotidiano" element={<Cotidiano />} />
          <Route path="/cultura" element={<Cultura />} />
          <Route path="/esportes" element={<Esportes />} />
          <Route path="/saude" element={<Saude />} />
          <Route path="/economia" element={<Economia />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <BackToTopButton />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
