export type Quote = {
  vertentes: string[];
  tipo: string;
  data: string;
  cidade: string;
  local: string;
  convidados: string;
  preferencias: string;
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
  consentimento: boolean;
  empresa_site: string;
};
export const emptyQuote: Quote = {
  vertentes: [],
  tipo: "",
  data: "",
  cidade: "",
  local: "",
  convidados: "",
  preferencias: "",
  nome: "",
  telefone: "",
  email: "",
  observacoes: "",
  consentimento: false,
  empresa_site: "",
};
export function validateQuote(q: Quote, step: number, today: string) {
  const errors: Record<string, string> = {};
  if (step === 1) {
    if (!q.vertentes.length)
      errors.vertentes = "Selecione pelo menos uma vertente.";
    if (!q.tipo) errors.tipo = "Selecione o tipo de evento.";
    if (!q.cidade.trim()) errors.cidade = "Informe a cidade do evento.";
    if (q.data && q.data < today)
      errors.data = "Escolha a data de hoje ou uma data futura.";
    if (
      q.convidados &&
      (!Number.isInteger(Number(q.convidados)) ||
        Number(q.convidados) < 1 ||
        Number(q.convidados) > 100000)
    )
      errors.convidados = "Informe uma quantidade inteira entre 1 e 100.000.";
  } else {
    if (q.nome.trim().length < 2)
      errors.nome = "Informe seu nome, com pelo menos 2 letras.";
    if (
      !/^\+?[\d\s().-]+$/.test(q.telefone) ||
      q.telefone.replace(/\D/g, "").length < 10 ||
      q.telefone.replace(/\D/g, "").length > 15
    )
      errors.telefone = "Informe um telefone válido com DDD.";
    if (q.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email))
      errors.email = "Confira o formato do e-mail.";
    if (!q.consentimento)
      errors.consentimento =
        "Confirme que deseja usar os dados para preparar seu pedido.";
    if (q.empresa_site)
      errors.empresa_site =
        "Não foi possível preparar o resumo. Revise o formulário.";
  }
  return errors;
}
export function quoteSummary(q: Quote) {
  return [
    "Olá! Gostaria de uma proposta do Grupo Toccante.",
    "",
    `Nome: ${q.nome.trim()}`,
    `Telefone: ${q.telefone.trim()}`,
    q.email && `E-mail: ${q.email.trim()}`,
    `Vertentes: ${q.vertentes.join(", ")}`,
    `Tipo de evento: ${q.tipo}`,
    `Data: ${q.data ? q.data.split("-").reverse().join("/") : "A definir"}`,
    `Cidade: ${q.cidade.trim()}`,
    q.local && `Local: ${q.local.trim()}`,
    q.convidados && `Convidados: ${q.convidados}`,
    q.preferencias && `Preferências: ${q.preferencias.trim()}`,
    q.observacoes && `Observações: ${q.observacoes.trim()}`,
  ]
    .filter((x) => x !== "")
    .join("\n");
}
