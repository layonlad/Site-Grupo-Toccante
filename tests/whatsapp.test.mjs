import test from "node:test";
import assert from "node:assert/strict";
import {
  contacts,
  claimContact,
  whatsappUrl,
  STORAGE_KEY,
} from "../app/whatsapp.ts";

function memory() {
  const data = new Map();
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => data.set(k, v),
  };
}
test("os quatro contatos e números estão corretos", () => {
  assert.deepEqual(
    contacts.map((c) => `${c.name}:${c.phone}`),
    [
      "Israel:5531983031736",
      "Raiane:5531999188761",
      "Marcela:5531984459856",
      "Paulo:5531998308910",
    ],
  );
});
test("cada novo lead vai para uma pessoa diferente, em sequência", () => {
  const store = memory();
  const names = Array.from(
    { length: 8 },
    () => claimContact(store, () => 0.6).name,
  );
  // Começa em Marcela (sorteio 0.6) e percorre todos antes de repetir.
  assert.deepEqual(names, [
    "Marcela",
    "Paulo",
    "Israel",
    "Raiane",
    "Marcela",
    "Paulo",
    "Israel",
    "Raiane",
  ]);
  assert.equal(store.getItem(STORAGE_KEY), "2");
});
test("sem armazenamento ainda escolhe um dos contatos", () => {
  const broken = {
    getItem: () => {
      throw new Error("x");
    },
    setItem: () => {
      throw new Error("x");
    },
  };
  assert.ok(contacts.some((c) => c === claimContact(broken, () => 0.1)));
});
test("a mensagem é codificada no link do WhatsApp", () => {
  const url = whatsappUrl(contacts[0], "Olá! Nome: Ana & Cia");
  assert.equal(
    url,
    "https://wa.me/5531983031736?text=Ol%C3%A1!%20Nome%3A%20Ana%20%26%20Cia",
  );
});
