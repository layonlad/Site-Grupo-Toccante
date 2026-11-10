# Grupo Toccante

Site institucional em Vinext/React, no projeto Sites existente. Acesso e identidade são definidos em `.openai/hosting.json`; não crie outro projeto para atualizar este.

## Conteúdo e identidade

- `app/content.ts`: vertentes, equipe confirmada, portfólio, FAQ e metadados.
- `app/globals.css`: paleta oficial, fontes locais, grid e responsividade.
- `app/components.tsx`: cabeçalho, navegação, rodapé e componentes compartilhados.
- `app/site.tsx`: composição das páginas.
- `app/contact-form.tsx` e `app/quote.ts`: formulário, validação e resumo para o atendimento com rodízio.
- `app/media.json` e `public/media`: fotografias reais e versões WebP responsivas.
- `docs/RELATORIO-REVISAO.md`: fontes, escopo, testes e materiais pendentes.

## Desenvolvimento

Requer Node 22.13+ e pnpm. Use `pnpm install` e `pnpm dev --port 4173`.

- `pnpm typecheck`: tipos do aplicativo e runtime.
- `pnpm test`: validação do orçamento.
- `pnpm test:routes`: respostas HTTP da prévia em localhost:4173 (ou TEST_BASE_URL).
- `pnpm test:browser`: acessibilidade, teclado, galeria e formulário; utiliza o navegador local de QA.
- `pnpm build`: saída de produção para Cloudflare Workers / Sites.

Scripts de QA deste ambiente usam o Playwright do runtime Codex e Chrome local. As capturas e relatórios ficam em `../review/`. O script de assets usa os originais em `../review/materials/selected/` e precisa de Pillow, fonttools e brotli; não modifica os materiais originais.

O formulário só prepara texto localmente. O usuário copia o resumo e conclui o envio no WhatsApp pelo atendimento oficial; nenhum backend ou posição da fila é alterado pelo site.
