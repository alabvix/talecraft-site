# AGENTS.md — TaleCraft site

Landing page estática do TaleCraft em GitHub Pages. Este arquivo registra estado,
convenções e armadilhas para quem continuar o trabalho.

## Estado

- Página única (`index.html`), `404.html`, `robots.txt`, `.nojekyll`, README.
- Tema "Manuscrito" em `assets/css/site.css` (papel `#efe7d9`, tinta `#2b2620`,
  roxo `#6a3fbf`, cobre `#a34f2b`).
- 17 capturas publicadas em `assets/telas/` (2400×1500, exceto
  `arvore-familiar.jpg`, recortada em 691×845). Miniaturas de 1200px em
  `assets/telas/mini/` (todas menos a árvore familiar). A galeria usa 13 telas;
  as três prévias de tema ficam em `#temas`. O capturador do app já gera **22**
  imagens (inclui Capítulos e Gráficos), mas as novas ainda **não** foram
  incorporadas à galeria.
- Publicação via `.github/workflows/pages.yml` (GitHub Actions → Pages).
- **Repositório público** (GitHub Pages no plano gratuito exige source público).
  O app continua privado; a release de teste fica no repositório separado
  <https://github.com/alabvix/talecraft-releases/releases/tag/v0.1.0>.
- **Newsletter oficial:** <https://talecraftapp.substack.com/> — é o CTA principal
  (topo, hero, download e rodapé). O site **não** divulga o repositório de
  código-fonte nem links de releases; incluir o link da release é uma decisão
  pendente.
- Sem `gh` CLI nesta máquina: criar o repositório remoto é tarefa do usuário.

## Como validar

- Servir a pasta por HTTP (`python -m http.server 8080`) e abrir no navegador.
- Conferir que todos os `src`/`href` relativos existem.
- Conferir que não há `U+FFFD` (caractere de substituição) nos arquivos.
- Verificar o layout em ~1600px, ~900px e ~420px; o menu vira hambúrguer em 820px.
- O lightbox usa `<dialog>`; testar teclado (setas, Esc) e clique no fundo.

## Armadilhas

- **Windows + acentos**: nunca use `Get-Content`/`Set-Content` em arquivos com
  acento; eles corrompem o encoding. Use a ferramenta `edit`/`write` ou
  `[IO.File]::ReadAllText/WriteAllText` com `UTF8Encoding($false)`.
- **Sem visão de imagem** no ambiente do agente: valide as capturas por dimensão e
  peso; peça conferência visual ao usuário quando importar.
- **Não invente telas**: as imagens vêm do app real, com dados de demonstração.
  As capturas atuais são anteriores ao RF014/RF015: nelas os contadores de
  vínculos aparecem zerados. Ao recapturar, use o banco de demonstração do
  `capturar-telas.mjs` e atualize as duas versões (cheia e `mini/`).
- **Não há arte de mundo** no projeto: a ficha do mundo mostra o placeholder real.
- **Duas versões de cada tela**: a galeria usa `mini/`; o lightbox usa a versão
  cheia (`data-cheia`). Ao trocar uma captura, atualize as duas.
- **Tema da captura não é automático**: o capturador fixa `talecraft.tema` em
  `tundra` antes da galeria (para o papel claro da landing) e gera as três
  prévias de Meus Livros no fim. Sem fixar o tema, o localStorage do WebView2
  vaza entre execuções e a imagem do card Blade Byte sai clara.
- Os gráficos de **arco narrativo** e **Ação / Suspensão** já existem no app
  desde o **RF016** (28/10/2026). A landing ainda os apresenta como "planejado";
  atualize o texto de `#recursos` e inclua as capturas de Capítulos e Gráficos
  antes de publicar a próxima versão do site.
- O tema da landing é próprio. Não adicione seletor de tema nem copie o seletor do
  aplicativo.
- **Sem links para o código-fonte:** não adicione GitHub, releases ou issues do
  aplicativo à página. O caminho para acompanhar o projeto é a newsletter
  (<https://talecraftapp.substack.com/>).
- **Caminhos absolutos**: só a `404.html` usa `/talecraft-site/...` (para funcionar em
  URLs profundas do Pages) e o `index.html` aponta `canonical`/`og:*` para esse
  domínio. Se o repositório ou o domínio mudar, atualize os dois arquivos.
- **Pesos das fontes**: `fontes.css` declara 500/600/700 apontando para os arquivos
  400 herdados do app. É intencional (mesma tipografia do aplicativo); não troque os
  arquivos sem conferir o desenho das telas.

## Regenerar as capturas

No diretório do aplicativo (irmão deste):

```powershell
node scripts/capturar-telas.mjs
```

Requisitos: `npm install` feito, binário de debug compilado
(`cargo build --manifest-path src-tauri/Cargo.toml`) e Vite (o script sobe sozinho).
As imagens são gravadas em `../talecraft-site/assets/telas/`. Depois regere
`mini/` (1200px, JPEG q82) — o script não faz as miniaturas.

---

## Próximos passos (29/10/2026)

1. **Atualizar a landing:** Capítulos (RF015) e Gráficos (RF016) já existem, mas
   o texto ainda os trata como planejados. Incluir as capturas novas e revisar
   `#recursos`.
2. **Decidir o link da release:** o site hoje não divulga código nem releases.
   Se for divulgar, usar
   <https://github.com/alabvix/talecraft-releases/releases/tag/v0.1.0>.
3. **Recapturar a galeria:** o script do app gera 22 imagens; a galeria tem 17.
   Regerar `mini/` depois.
4. **Visibilidade do source:** manter o repositório público (GitHub Pages no
   plano gratuito) ou migrar para Cloudflare Pages/Netlify com repositório
   privado.
5. Último commit: **`1fe9130`**.
