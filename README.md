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

## Scripts
- `npm install` — instala dependências
- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — pré-visualizar o build

## Deploy
- GitHub Pages: usar Actions (`.github/workflows/vite-gh-pages.yml`), `base` configurado para `/leonews/`.
- Netlify: build `npm run build`, publish `dist/` e variável `NETLIFY=true` para `base` raiz.
