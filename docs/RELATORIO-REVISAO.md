# Revisão do site Grupo Toccante — 6 de novembro de 2026

## Resultado

Reformulação das dez páginas principais e da página 404 no mesmo projeto Sites, preservando a configuração de acesso. A identidade segue Toccante Designer: EB Garamond para títulos; Lato Regular/Bold para informação funcional; dourado #B59758, marsala #7A263C, preto #202020, branco #FFFFFF e marfim #F7F5F1.

Cada vertente tem seu fundo e seus detalhes próprios. Textos funcionais usam contraste legível; no Cerimonial, o título principal fica em painel marfim sobre o campo dourado. Dourado/branco de baixo contraste são reservados a filetes e detalhes, sem inventar novas cores de marca.

## Auditoria e correções

O site anterior utilizava páginas completas de apresentações como fotografias, fontes Arial/Georgia, cores divergentes, depoimentos e equipes provisórias, contatos não confirmados nos materiais atuais, formulário sem transmissão de dados e testes remanescentes do template.

Foram reconstruídos cabeçalho, menu móvel, rodapé, heroes, cartões das vertentes, grades de serviços, processo, galeria, filtros, modal de fotos, FAQ, chamadas para orçamento e formulário. Há um contêiner comum de 1280 px, margens fluidas, tokens de espaçamento/tipografia, foco visível, alvos de interação, menu com retenção de foco e fechamento por Escape, e suporte a redução de movimento.

## Páginas

- Início: proposta do grupo, quatro vertentes, integração, portfólio, essência/equipe, FAQ e orçamento.
- Música, Buffet, Decoração e Cerimonial: textos próprios confirmados, serviços, etapas, fotos, contexto da equipe, FAQ e chamada correspondente à vertente.
- Quem somos e Equipe: informações institucionais confirmadas; perfil de Raiane Ventura com função verificada.
- Portfólio: nove registros, filtros, ampliação acessível, retorno de foco e fechamento por Escape.
- Contato: duas etapas de preenchimento, seleção múltipla, erros específicos, data/quantidade/telefone/e-mail, consentimento e revisão do resumo.
- Privacidade: explicação factual do comportamento do formulário e do encaminhamento externo.
- 404: resposta HTTP 404 real e caminhos de retorno.

## Atendimento

Mantido o canal oficial https://grupotoccanteoficial.github.io/Link.toccante/ com rodízio entre especialistas, conforme escolha explícita do usuário. O formulário prepara o resumo no navegador; não grava dados em banco nem envia mensagens automaticamente. O visitante copia o resumo, abre o canal de atendimento e envia pelo WhatsApp ao especialista indicado. Há alternativa de seleção manual do texto se a cópia automática não estiver disponível.

O site institucional não altera o backend, a fila, os contatos nem a elegibilidade do rodízio. O endereço oficial respondeu HTTP 200. Não foram consumidas atribuições reais nem enviadas mensagens durante os testes. O campo antispam é uma verificação local; não existe endpoint de recebimento a proteger neste fluxo.

## Fotografias, logo e fontes

- 14 fotografias reais selecionadas dos PDFs, com 34 versões WebP responsivas (cerca de 1,98 MB somadas).
- Recortes geométricos, redimensionamento proporcional, leve nitidez apenas em reduções e compressão WebP. Sem reconstrução generativa, alteração de pessoas, roupas ou objetos.
- Originais preservados na pasta de materiais. Fotografias de origem incerta e imagens ilustrativas foram excluídas da seleção utilizada.
- Logo reutilizado como SVG estático a partir da geometria e da máscara da abertura HTML fornecida, sem redesenho.
- Fontes completas obtidas do repositório oficial Google Fonts, convertidas para WOFF2 e hospedadas localmente com licenças. Preload apenas de EB Garamond e Lato Regular.
- Imagens com dimensões explícitas, srcset, sizes, lazy loading e prioridade na imagem de abertura.

Proveniência: proposta institucional de 17 páginas, portfólio Cerimonial de 12 páginas, manual Toccante Designer de 18 páginas, abertura HTML e materiais do atendimento. A proposta individual foi usada somente para confirmar categorias de serviço e fotos; nome da cliente, preço, data, número de convidados, brindes e condições não foram publicados como oferta geral.

## SEO e manutenção

Títulos e descrições individuais, canonical, Open Graph, metadados sociais, favicon oficial, HTML semântico, idioma pt-BR, sitemap, robots e dados estruturados de Organization sem endereço/telefone inventados. O acesso privado existente continua valendo; metadados não tornam o site público.

Conteúdo principal: app/content.ts. Fotos e dimensões: app/media.json. Componentes: app/components.tsx. Composição das páginas: app/site.tsx. Formulário: app/contact-form.tsx; regras: app/quote.ts. Identidade e layout: app/globals.css. Nenhum formulário ou integração externa foi removido: a versão anterior não possuía envio ao servidor.

## Verificação

- TypeScript: sem erros.
- Compilação Vinext de produção: concluída.
- Oito testes de regras do orçamento, renderização/SEO, recursos e 404: aprovados.
- Dez páginas principais e 404 verificadas em 320, 360, 390, 430, 768, 1024, 1280, 1440 e 1920 px: 99 combinações, sem rolagem horizontal, imagens quebradas ou erros de execução.
- Capturas de celular, tablet e desktop; revisão de início, meio e final das páginas.
- Teclado: menu móvel com foco contido, Escape e retorno do foco; menu de vertentes no desktop e FAQ.
- Formulário: erros, seleção das quatro vertentes, dados preservados ao voltar, resumo, área de transferência e link correto do atendimento.
- Portfólio: filtros por vertente, filtro por URL, modal e Escape.
- 18 destinos internos verificados.
- Axe: zero violações nas regras WCAG A/AA selecionadas nas dez páginas em celular/desktop e no resumo do formulário. A automação não substitui uma auditoria especializada com tecnologias assistivas reais.

Evidências completas em ../review/ (fora do código publicado): capturas antes/depois, relatórios de larguras, acessibilidade e interações. Não foi feito envio real de orçamento, teste da fila de produção ou medição de Core Web Vitals em tráfego real.

## Materiais ainda ausentes e próxima etapa

Originais independentes das tags e símbolos, retratos individuais limpos, dados completos das demais equipes, depoimentos autorizados e contato institucional único não constam nos materiais atuais. O site usa identificação textual das vertentes e fotos autênticas; não improvisa símbolos ou depoimentos. Próxima etapa sugerida: incorporar esses originais quando disponibilizados e validar o conteúdo de privacidade do atendimento externo com os responsáveis.
