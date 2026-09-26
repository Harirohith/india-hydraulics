import * as React from "react";

/**
 * FUNCTIONAL icons only — controls (menu, close, search, upload, check,
 * chevrons), contact affordances and the WhatsApp mark. The design uses
 * photography and typography, never decorative/feature icons.
 * Shapes follow Lucide (ISC licence).
 *
 *   <Icon name="search" className="h-5 w-5" />
 *
 * Decorative by default (aria-hidden). Pass `title` to make it announced.
 */
type IconDef = { body: React.ReactNode; viewBox?: string; filled?: boolean };

const ICONS = {
  "arrow-right": { body: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></> },
  "arrow-up-right": { body: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></> },
  "chevron-right": { body: <path d="m9 6 6 6-6 6" /> },
  "chevron-down": { body: <path d="m6 9 6 6 6-6" /> },
  check: { body: <path d="M20 6 9 17l-5-5" /> },
  "check-circle": { body: <><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></> },
  menu: { body: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></> },
  x: { body: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></> },
  search: { body: <><circle cx="11" cy="11" r="7.5" /><path d="m21 21-4.3-4.3" /></> },
  upload: {
    body: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>,
  },

  // Contact
  phone: {
    body: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  mail: { body: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></> },
  "map-pin": {
    body: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  },
  clock: { body: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></> },
  whatsapp: {
    viewBox: "0 0 32 32",
    filled: true,
    body: (
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.054 31.35l6.178-1.963a15.9 15.9 0 0 0 8.772 2.617C24.826 32 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.616c-.392 1.106-1.934 2.024-3.182 2.292-.854.18-1.968.324-5.72-1.228-4.802-1.986-7.892-6.856-8.132-7.174-.228-.318-1.928-2.566-1.928-4.894 0-2.328 1.218-3.47 1.65-3.944.392-.432.928-.604 1.26-.604.152 0 .29.008.414.014.432.02.648.044.932.724.356.848 1.222 2.916 1.33 3.128.108.212.212.49.068.784-.132.3-.248.432-.46.664-.212.232-.412.41-.624.662-.192.224-.408.464-.172.896.236.432 1.052 1.734 2.26 2.812 1.552 1.386 2.86 1.816 3.264 2.016.404.2.64.168.876-.1.248-.28 1.052-1.222 1.332-1.642.28-.42.56-.348.944-.208.388.14 2.452 1.158 2.872 1.368.42.212.7.316.804.492.1.176.1 1.026-.292 2.132z" />
    ),
  },

} satisfies Record<string, IconDef>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.75,
  title,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  /** Accessible name. Omit for decorative icons. */
  title?: string;
}) {
  const def: IconDef = ICONS[name];
  return (
    <svg
      viewBox={def.viewBox ?? "0 0 24 24"}
      fill={def.filled ? "currentColor" : "none"}
      stroke={def.filled ? "none" : "currentColor"}
      strokeWidth={def.filled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {def.body}
    </svg>
  );
}
