"use client";
import type { ReactNode } from "react";
import {
  claimContact,
  defaultMessage,
  whatsappUrl,
  type Contact,
} from "./whatsapp";

function storage() {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
/** Abre o WhatsApp do próximo especialista da fila. */
export function openWhatsApp(text: string = defaultMessage): Contact {
  const contact = claimContact(storage());
  const url = whatsappUrl(contact, text);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
  return contact;
}
// Sem JavaScript o link leva ao formulário de contato.
const FALLBACK = "/contato" + "";

export default function WhatsAppLink({
  className,
  children,
  text,
  label,
  onOpen,
}: {
  className?: string;
  children: ReactNode;
  text?: string;
  label?: string;
  onOpen?: (contact: Contact) => void;
}) {
  return (
    <a
      className={className}
      href={FALLBACK}
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        const contact = openWhatsApp(text);
        onOpen?.(contact);
      }}
    >
      {children}
    </a>
  );
}
