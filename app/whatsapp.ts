/** Atendimento por WhatsApp com rodízio entre os especialistas. */
export const contacts = [
  { name: "Israel", phone: "5531983031736" },
  { name: "Raiane", phone: "5531999188761" },
  { name: "Marcela", phone: "5531984459856" },
  { name: "Paulo", phone: "5531998308910" },
] as const;
export type Contact = (typeof contacts)[number];

export const STORAGE_KEY = "tg-wa-next";
export const defaultMessage =
  "Olá! Vim pelo site do Grupo Toccante e gostaria de falar sobre o meu evento.";

type Store = Pick<Storage, "getItem" | "setItem">;

export function whatsappUrl(contact: Contact, text: string = defaultMessage) {
  return `https://wa.me/${contact.phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Devolve o próximo contato da fila e já avança a posição: cada novo contato
 * vai para uma pessoa diferente, em sequência. A primeira escolha de cada
 * navegador é aleatória, para a fila não começar sempre pela mesma pessoa.
 */
export function claimContact(
  store?: Store,
  random: () => number = Math.random,
): Contact {
  let index = Math.floor(random() * contacts.length);
  try {
    const saved = Number.parseInt(store?.getItem(STORAGE_KEY) ?? "", 10);
    if (Number.isInteger(saved) && saved >= 0) index = saved % contacts.length;
    store?.setItem(STORAGE_KEY, String((index + 1) % contacts.length));
  } catch {
    /* sem armazenamento: usa o sorteio simples */
  }
  return contacts[index];
}
