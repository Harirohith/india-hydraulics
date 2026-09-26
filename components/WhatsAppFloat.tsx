import { company } from "@/lib/content";
import { Icon } from "./Icon";

/** Always-available WhatsApp shortcut — how most customers reach us. */
export function WhatsAppFloat() {
  return (
    <a
      href={company.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with India Hydraulics on WhatsApp"
    >
      <Icon name="whatsapp" />
    </a>
  );
}
