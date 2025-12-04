# LeoNews

Portal de notícias de Araguaína feito com Vite + React + TypeScript + Tailwind.

## Estrutura
- `src/` — código-fonte principal
  - `components/` — cabeçalho, footer, cards, UI e helpers (ex.: `WeatherCard`, `BackToTopButton`)
  - `hooks/` — hooks de dados (ex.: `useNews`)
  - `pages/` — páginas e rotas (Index, NewsDetail, categorias como política/esportes etc.)
  - `services/` — integrações (ex.: `newsApi`, `weatherApi`, `summaryService`)
  - `assets/` — ícones/imagens locais
- `public/` — estáticos públicos (favicons etc.)
- `dist/` — build gerado (não editar à mão)
- `.github/workflows/` — pipelines (GitHub Pages via Actions)
- `netlify.toml` — config de deploy no Netlify

## Sobre a aplicação
- Portal de notícias local para Araguaína, com categorias (política, cotidiano, cultura, esportes, economia, saúde).
- Integração de notícias em `services/newsApi` com fallback local para manter a grade sempre populada.
- Previsão do tempo com resumo atual e previsão de 5 dias em `components/WeatherCard` / `services/weatherApi`.
- Detalhe de notícia com resumo automático local, tags e layout responsivo.
- Tema claro/escuro com persistência, botão de voltar ao topo e favicon em SVG (emoji de jornal).
