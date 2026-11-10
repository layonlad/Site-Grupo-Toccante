"use client";
import { useSyncExternalStore, useRef, useState, type FormEvent } from "react";
import { branches, site } from "./content";
import { emptyQuote, quoteSummary, validateQuote, type Quote } from "./quote";
function localDay() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function watchDay(notify: () => void) {
  window.addEventListener("focus", notify);
  return () => window.removeEventListener("focus", notify);
}
export default function ContactForm({
  initialBranch,
}: {
  initialBranch?: string;
}) {
  const [data, setData] = useState<Quote>(() => {
    const branch = branches.find((b) => b.key === initialBranch);
    return { ...emptyQuote, vertentes: branch ? [branch.label] : [] };
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const today = useSyncExternalStore(watchDay, localDay, () => "");
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  function update<K extends keyof Quote>(key: K, value: Quote[K]) {
    setData((q) => ({ ...q, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setCopied(false);
  }
  function focusHeading() {
    requestAnimationFrame(() => heading.current?.focus());
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    const issues = validateQuote(data, step, localDay());
    setErrors(issues);
    if (Object.keys(issues).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    if (step === 1) {
      setStep(2);
    } else {
      setReady(true);
    }
    focusHeading();
  }
  function toggle(label: string) {
    update(
      "vertentes",
      data.vertentes.includes(label)
        ? data.vertentes.filter((x) => x !== label)
        : [...data.vertentes, label],
    );
  }
  const error = (key: string) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {errors[key]}
      </span>
    ) : null;
  function field(
    key: Exclude<keyof Quote, "vertentes" | "consentimento">,
    label: string,
    type = "text",
    required = false,
    autoComplete?: string,
  ) {
    return (
      <div className="field">
        <label htmlFor={key}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        <input
          id={key}
          name={key}
          type={type}
          autoComplete={autoComplete}
          value={data[key]}
          onChange={(e) => update(key, e.target.value)}
          required={required}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
          maxLength={key === "telefone" ? 25 : 150}
          min={type === "date" ? today : type === "number" ? 1 : undefined}
          max={type === "number" ? 100000 : undefined}
          step={type === "number" ? 1 : undefined}
          inputMode={
            type === "tel" ? "tel" : type === "number" ? "numeric" : undefined
          }
        />
        {error(key)}
      </div>
    );
  }
  async function copy() {
    setBusy(true);
    setCopyError("");
    try {
      await navigator.clipboard.writeText(quoteSummary(data));
      setCopied(true);
    } catch {
      setCopyError(
        "Não foi possível copiar automaticamente. Selecione o resumo abaixo e copie-o para enviar no atendimento.",
      );
    } finally {
      setBusy(false);
    }
  }
  const hasErrors = Object.values(errors).some(Boolean);
  return (
    <div className="quote-card">
      <div
        className="step-indicator"
        aria-label={ready ? "Resumo pronto" : `Etapa ${step} de 2`}
      >
        <span className={step === 1 && !ready ? "current" : ""}>
          01 · Seu evento
        </span>
        <span className={step === 2 && !ready ? "current" : ""}>
          02 · Seu contato
        </span>
        <span className={ready ? "current" : ""}>03 · Resumo</span>
      </div>
      <h2 ref={heading} tabIndex={-1}>
        {ready
          ? "Seu resumo está pronto."
          : step === 1
            ? "Como você imagina esse dia?"
            : "Como podemos falar com você?"}
      </h2>
      {ready ? (
        <div className="quote-result">
          <p role="status">
            Nada foi enviado ainda. Copie o resumo, abra o atendimento oficial e
            cole a mensagem no WhatsApp do especialista indicado.
          </p>
          <label htmlFor="resumo">Resumo do pedido</label>
          <textarea id="resumo" value={quoteSummary(data)} readOnly rows={12} />
          <div className="actions">
            <button
              className="button"
              type="button"
              onClick={copy}
              disabled={busy}
              aria-busy={busy}
            >
              {busy
                ? "Copiando…"
                : copied
                  ? "Resumo copiado ✓"
                  : "1. Copiar resumo"}
            </button>
            <a className="button button-outline" href={site.attendance}>
              2. Abrir atendimento ↗
            </a>
          </div>
          {copied && (
            <p className="success-message" role="status">
              Resumo copiado. Agora abra o atendimento e envie a mensagem no
              WhatsApp.
            </p>
          )}
          {copyError && (
            <p className="field-error" role="alert">
              {copyError}
            </p>
          )}
          <button
            className="text-link"
            type="button"
            onClick={() => {
              setReady(false);
              setCopied(false);
              focusHeading();
            }}
          >
            ← Editar meus dados
          </button>
        </div>
      ) : (
        <form ref={form} onSubmit={submit} noValidate>
          <p className="form-hint">
            {step === 1
              ? "Conte o que já sabe. Data e quantidade podem ficar para depois."
              : "Usaremos essas informações apenas para preparar o resumo do orçamento."}{" "}
            Campos com * são obrigatórios.
          </p>
          {hasErrors && (
            <p className="error-summary" role="alert">
              Revise os campos indicados antes de continuar.
            </p>
          )}
          {step === 1 ? (
            <>
              <fieldset
                className="branch-options"
                aria-describedby={
                  errors.vertentes ? "vertentes-error" : undefined
                }
              >
                <legend>Quais vertentes você procura? *</legend>
                <div>
                  {branches.map((b, i) => (
                    <label
                      className={`branch-option option-${b.key}`}
                      key={b.key}
                    >
                      <input
                        type="checkbox"
                        name="vertentes"
                        value={b.label}
                        checked={data.vertentes.includes(b.label)}
                        onChange={() => toggle(b.label)}
                        aria-invalid={i === 0 && !!errors.vertentes}
                        aria-describedby={
                          errors.vertentes ? "vertentes-error" : undefined
                        }
                      />
                      <span>{b.label}</span>
                    </label>
                  ))}
                </div>
                {error("vertentes")}
                <button
                  type="button"
                  className="text-link select-all"
                  onClick={() =>
                    update(
                      "vertentes",
                      data.vertentes.length === 4
                        ? []
                        : branches.map((b) => b.label),
                    )
                  }
                >
                  {data.vertentes.length === 4
                    ? "Limpar seleção"
                    : "Quero a experiência completa"}
                </button>
              </fieldset>
              <div className="field-grid">
                <div className="field">
                  <label htmlFor="tipo">Tipo de evento *</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={data.tipo}
                    onChange={(e) => update("tipo", e.target.value)}
                    required
                    aria-invalid={!!errors.tipo}
                    aria-describedby={errors.tipo ? "tipo-error" : undefined}
                  >
                    <option value="">Selecione</option>
                    {[
                      "Casamento",
                      "Aniversário",
                      "Evento corporativo",
                      "Formatura",
                      "Outra celebração",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {error("tipo")}
                </div>
                {field("cidade", "Cidade", "text", true, "address-level2")}
                {field("data", "Data do evento", "date")}
                {field("convidados", "Quantidade de convidados", "number")}
              </div>
            </>
          ) : (
            <>
              <div className="field-grid">
                {field("nome", "Nome", "text", true, "name")}
                {field("telefone", "Telefone com DDD", "tel", true, "tel")}
                {field("email", "E-mail (opcional)", "email", false, "email")}
                {field("local", "Local do evento (opcional)")}
              </div>
              <div className="field">
                <label htmlFor="preferencias">Preferências (opcional)</label>
                <textarea
                  id="preferencias"
                  name="preferencias"
                  value={data.preferencias}
                  onChange={(e) => update("preferencias", e.target.value)}
                  rows={3}
                  maxLength={1000}
                  placeholder="Músicas, estilo da decoração, cardápio…"
                />
              </div>
              <div className="field">
                <label htmlFor="observacoes">
                  Outras informações (opcional)
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={data.observacoes}
                  onChange={(e) => update("observacoes", e.target.value)}
                  rows={3}
                  maxLength={1000}
                />
              </div>
              <label className="consent">
                <input
                  name="consentimento"
                  type="checkbox"
                  checked={data.consentimento}
                  onChange={(e) => update("consentimento", e.target.checked)}
                  required
                  aria-invalid={!!errors.consentimento}
                  aria-describedby={
                    errors.consentimento ? "consentimento-error" : undefined
                  }
                />
                <span>
                  Concordo em usar os dados informados para preparar meu pedido
                  e li as{" "}
                  <a
                    href="/privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    informações de privacidade (abre em nova aba)
                  </a>
                  . *
                </span>
              </label>
              {error("consentimento")}
            </>
          )}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="empresa_site">Deixe este campo em branco</label>
            <input
              id="empresa_site"
              name="empresa_site"
              value={data.empresa_site}
              onChange={(e) => update("empresa_site", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="form-actions">
            {step === 2 && (
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setStep(1);
                  setErrors({});
                  focusHeading();
                }}
              >
                ← Voltar
              </button>
            )}
            <button className="button" type="submit">
              {step === 1 ? "Continuar" : "Preparar meu resumo"}{" "}
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="small-text">
            O envio ao especialista é concluído por você no WhatsApp.
          </p>
        </form>
      )}
    </div>
  );
}
