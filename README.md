# TaleCraft — site

Landing page estática do [TaleCraft](https://github.com/alabvix/talecraft-app), o
aplicativo desktop de planejamento de livros de ficção científica, fantasia e terror.

O site não usa bibliotecas, framework nem build. É HTML, um CSS e um JavaScript
curto — publicado como está no GitHub Pages.

## Estrutura

```
.
├── index.html                  página única
├── 404.html                    página de erro
├── robots.txt
├── .nojekyll                   desliga o Jekyll no Pages
├── .github/workflows/pages.yml publicação via GitHub Actions
└── assets/
    ├── css/site.css            todos os estilos (tema "Manuscrito")
    ├── js/site.js              menu, topbar, revelação e lightbox
    ├── fontes/                 Alegreya, Inter, JetBrains Mono (+ temas do app)
    ├── img/                    favicon e ícone
    └── telas/                  capturas reais do aplicativo
        └── mini/               miniaturas 1200px usadas na página
```

## Prévia local

Basta servir a pasta por HTTP (as fontes e o lightbox funcionam melhor assim):

```powershell
# na raiz deste repositório
python -m http.server 8080
# ou
npx serve .
```

Depois abra <http://localhost:8080/>.

## Telas do aplicativo

As imagens em `assets/telas/` são capturas reais do aplicativo, feitas com um banco
de demonstração isolado (nenhum dado de usuário é tocado). O script vive no
repositório do app:

```powershell
cd ../talecraft-app
node scripts/capturar-telas.mjs
```

Ele sobe o Vite, abre o binário de debug do Tauri via CDP, semeia personagens,
relações, mundos, entradas, facções e dois livros, e grava as imagens em
`../talecraft-site/assets/telas/` a 2400×1500. As capturas da galeria usam o tema
**Tundra** (claro); ao final, o script gera também **Meus Livros** nos três temas
(`meus-livros-blade-byte`, `-old-tower` e `-tundra`). As miniaturas de `mini/` são
geradas a partir delas (1200px de largura, JPEG q82).

Se uma tela mudar no app, rode o script de novo e regere as miniaturas.

## Publicação

O workflow `.github/workflows/pages.yml` publica a raiz do repositório no GitHub
Pages a cada push na `main`. No repositório, em **Settings → Pages**, a origem deve
estar em **GitHub Actions**.

A página `404.html` usa caminhos absolutos com o prefixo `/talecraft-site/` — assim
ela continua estilizada mesmo quando o Pages a serve a partir de uma URL profunda.
Se o site mudar de endereço, ajuste esses caminhos e também as metatags `canonical`,
`og:url` e `og:image` do `index.html`.

## Convenções

- Conteúdo em português do Brasil.
- Um único CSS, com seções numeradas; sem dependências externas.
- Tema próprio ("Manuscrito": papel, tinta e roxo), sem seletor de temas — as três
  opções do aplicativo aparecem apenas como parte do conteúdo.
- Toda imagem precisa de `width`, `height`, `alt` e `loading="lazy"` (exceto a do
  hero, que é prioritária).
- O CTA de download aponta para o repositório de releases e leva o selo "em breve"
  enquanto não houver build pública.
