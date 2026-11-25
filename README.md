# Grupo Toccante

Site institucional em Vinext/React, no projeto Sites existente. Acesso e identidade são definidos em `.openai/hosting.json`; não crie outro projeto para atualizar este.

## Conteúdo e identidade

- `app/content.ts`: vertentes, equipe confirmada, portfólio, FAQ e metadados.
- `app/globals.css`: paleta da referência Toccante, fontes locais, molduras arredondadas, layout e responsividade.
- `app/motion.ts` e `app/intro.tsx`: revelação ao rolar, paralaxe e abertura com o logo motion (uma vez por sessão).
- `app/components.tsx`: cabeçalho, navegação, rodapé e componentes compartilhados.
- `app/site.tsx`: composição das páginas.
- `app/contact-form.tsx` e `app/quote.ts`: formulário, validação e resumo do pedido.
- `app/whatsapp.ts` e `app/whatsapp-link.tsx`: contatos do atendimento e rodízio (Israel, Raiane, Marcela, Paulo). Para trocar números, edite `contacts` em `app/whatsapp.ts`.
- `app/media.json`, `app/new-media.json` e `public/media`: fotografias reais e versões WebP responsivas. `node scripts/prepare-new-media.mjs <pasta de origem>` recorta e exporta as fotos novas.
- `docs/RELATORIO-REVISAO.md`: fontes, escopo, testes e materiais pendentes.

## Desenvolvimento

Requer Node 22.13+ e pnpm. Use `pnpm install` e `pnpm dev --port 4173`.

- `pnpm typecheck`: tipos do aplicativo e runtime.
- `pnpm test`: validação do orçamento.
- `pnpm test:routes`: respostas HTTP da prévia em localhost:4173 (ou TEST_BASE_URL).
- `pnpm test:browser`: acessibilidade, teclado, galeria e formulário; utiliza o navegador local de QA.
- `pnpm build`: saída de produção para Cloudflare Workers / Sites.

Scripts de QA deste ambiente usam o Playwright do runtime Codex e Chrome local. As capturas e relatórios ficam em `../review/`. O script de assets usa os originais em `../review/materials/selected/` e precisa de Pillow, fonttools e brotli; não modifica os materiais originais.

O formulário monta o resumo no navegador e abre o WhatsApp de um especialista com a mensagem pronta. O rodízio guarda no `localStorage` apenas a posição na fila (por navegador); não há backend, então a sequência não é compartilhada entre visitantes diferentes.
