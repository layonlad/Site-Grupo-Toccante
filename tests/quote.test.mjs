import test from "node:test";
import assert from "node:assert/strict";
import { emptyQuote, validateQuote, quoteSummary } from "../app/quote.ts";
const complete = {
  ...emptyQuote,
  vertentes: ["Música", "Cerimonial"],
  tipo: "Casamento",
  cidade: "Belo Horizonte",
  nome: "Cliente de teste",
  telefone: "(31) 99999-9999",
  consentimento: true,
};
test("requires a service, event type and city without forcing an undecided date", () => {
  assert.deepEqual(Object.keys(validateQuote(emptyQuote, 1, "2026-11-06")), [
    "vertentes",
    "tipo",
    "cidade",
  ]);
  assert.deepEqual(validateQuote(complete, 1, "2026-11-06"), {});
});
test("rejects past dates and fractional or negative guest counts", () => {
  for (const convidados of ["0", "-1", "1.5", "100001"])
    assert.ok(
      validateQuote({ ...complete, convidados }, 1, "2026-11-06").convidados,
    );
  assert.ok(
    validateQuote({ ...complete, data: "2026-11-05" }, 1, "2026-11-06").data,
  );
});
test("requires valid contact and consent but allows an omitted email", () => {
  assert.deepEqual(validateQuote(complete, 2, "2026-11-06"), {});
  const errors = validateQuote(
    {
      ...complete,
      nome: "",
      telefone: "abc123",
      email: "invalido",
      consentimento: false,
    },
    2,
    "2026-11-06",
  );
  assert.deepEqual(Object.keys(errors), [
    "nome",
    "telefone",
    "email",
    "consentimento",
  ]);
});
test("honeypot rejects a filled hidden field", () =>
  assert.ok(
    validateQuote({ ...complete, empresa_site: "spam" }, 2, "2026-11-06")
      .empresa_site,
  ));
test("summary includes all selected services and optional details without sending anything", () => {
  const summary = quoteSummary({
    ...complete,
    data: "2027-04-21",
    convidados: "150",
    local: "Local de teste",
    preferencias: "Música instrumental",
    observacoes: "Conversa inicial",
  });
  assert.match(summary, /Música, Cerimonial/);
  assert.match(summary, /21\/04\/2027/);
  assert.match(summary, /150/);
  assert.match(summary, /Música instrumental/);
  assert.doesNotMatch(summary, /undefined|false|E-mail:/);
});
