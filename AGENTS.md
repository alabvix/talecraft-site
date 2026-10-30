# AGENTS.md — TaleCraft site

Landing page estática do TaleCraft em GitHub Pages. Este arquivo registra estado,
convenções e armadilhas para quem continuar o trabalho.

## Estado

- Página única (`index.html`), `404.html`, `robots.txt`, `.nojekyll`, README.
- Tema "Manuscrito" em `assets/css/site.css` (papel `#efe7d9`, tinta `#2b2620`,
  roxo `#6a3fbf`, cobre `#a34f2b`).
- 22 capturas publicadas em `assets/telas/` (2400×1500, exceto
  `capitulo-personagens.jpg`, recortada em 1941×792, e `arvore-familiar.jpg`, em
  691×845). Miniaturas de 1200px em `assets/telas/mini/` (todas menos a árvore
  familiar). A galeria usa 18 telas; as três prévias de tema ficam em `#temas` e
  a árvore familiar em `#relacoes`. Os recursos do RF014–RF016 (elenco do livro,
  capítulos e gráficos) já estão incorporados à página.
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
  Ao recapturar, use o banco de demonstração do `capturar-telas.mjs` e atualize
  as duas versões (cheia e `mini/`).
- **Não há arte de mundo** no projeto: a ficha do mundo mostra o placeholder real.
- **Duas versões de cada tela**: a galeria usa `mini/`; o lightbox usa a versão
  cheia (`data-cheia`). Ao trocar uma captura, atualize as duas.
- **Tema da captura não é automático**: o capturador fixa `talecraft.tema` em
  `tundra` antes da galeria (para o papel claro da landing) e gera as três
  prévias de Meus Livros no fim. Sem fixar o tema, o localStorage do WebView2
  vaza entre execuções e a imagem do card Blade Byte sai clara.
- **`capitulo-personagens` é um recorte de elemento.** A imagem tem 1941×792
  (proporção própria) e usa a classe `.tela--faixa` para ocupar as duas colunas
  sem cortar nomes e controles. Não a force no `aspect-ratio: 8 / 5` das demais,
  nem a coloque em uma coluna só em telas largas.
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

## Próximos passos (30/10/2026)

1. **Revisar as capturas no navegador:** o agente não vê imagens; confira as 18
   telas da galeria e as três prévias de tema com o app aberto ao lado, em
   ~1600px, ~900px e ~420px (o recorte `capitulo-personagens` vira faixa).
2. **Decidir o link da release:** o site hoje não divulga código nem releases.
   Se for divulgar, usar
   <https://github.com/alabvix/talecraft-releases/releases/tag/v0.1.0>.
3. **Visibilidade do source:** manter o repositório público (GitHub Pages no
   plano gratuito) ou migrar para Cloudflare Pages/Netlify com repositório
   privado.
4. **Acompanhar o app:** quando chegarem a associação livro–mundo e a exportação
   do livro, atualizar `#recursos`, `#roadmap` e as capturas correspondentes.
5. Último commit: **`804f7bd`**.
