"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { AnimationEvent, ChangeEvent, DragEvent, FormEvent, ReactNode, Ref, RefObject } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { BreakableEmail, TextWithEmail } from "@/components/contact/Email";
import { company, industries } from "@/lib/content";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  product: string;
  message: string;
  file: File | null;
};
type Key = keyof Fields;
type Errors = Partial<Record<Key, string>>;
type Status = "idle" | "submitting" | "ok" | "err";

const EMPTY: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  product: "",
  message: "",
  file: null,
};

/** Reading order: after a failed submit, the first invalid field gets focus. */
const ORDER: Key[] = ["name", "company", "email", "phone", "industry", "product", "message", "file"];

const INDUSTRY_OPTIONS = [...industries, "Other"];

const MAX_BYTES = 10 * 1024 * 1024;
const EXTENSIONS = [".pdf", ".dwg", ".dxf", ".png", ".jpg", ".jpeg", ".step", ".stp"];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileProblem(file: File): string | undefined {
  const dot = file.name.lastIndexOf(".");
  const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : "";
  if (!EXTENSIONS.includes(ext)) return "Attach a PDF, DWG, DXF, PNG, JPG or STEP file.";
  if (file.size > MAX_BYTES) {
    return `This file is ${formatBytes(file.size)} — the limit is 10 MB. Attach a smaller file, or email it to ${company.email}.`;
  }
  return undefined;
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name.";
  const email = f.email.trim();
  if (!email) e.email = "Enter your email address — we reply to it.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address, like name@company.com.";
  const phone = f.phone.trim();
  if (phone && !/^[+\d\s()-]{7,}$/.test(phone)) e.phone = "Use digits, spaces, + ( ) and - only (at least 7).";
  if (f.message.trim().length < 10) e.message = "Describe what you need in at least 10 characters.";
  if (f.file) {
    const problem = fileProblem(f.file);
    if (problem) e.file = problem;
  }
  return e;
}

/** Restart the shake on a field wrapper (.field--err in globals.css). */
function shake(el: HTMLElement | null | undefined) {
  if (!el) return;
  el.classList.remove("field--err");
  void el.offsetWidth;
  el.classList.add("field--err");
}
function endShake(e: AnimationEvent<HTMLElement>) {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove("field--err");
}

export function ContactForm({ labelledBy }: { labelledBy?: string }) {
  const uid = useId();
  const fid = (k: Key) => `${uid}-${k}`;
  const searchParams = useSearchParams();

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [prefilled, setPrefilled] = useState("");
  const [sent, setSent] = useState<Fields | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [live, setLive] = useState("");

  const wraps = useRef<Partial<Record<Key, HTMLDivElement | null>>>({});
  const fileInput = useRef<HTMLInputElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);
  const afterFailedSubmit = useRef(false);
  const afterReset = useRef(false);
  const liveFlip = useRef(false);

  /** Screen-reader status line (the nbsp flip re-announces a repeated message). */
  const announce = (msg: string) => {
    liveFlip.current = !liveFlip.current;
    setLive(liveFlip.current ? msg : `${msg} `);
  };

  // Prefill the product from ?product= (the catalogue's "Request quote" links).
  useEffect(() => {
    const product = searchParams.get("product")?.trim().slice(0, 120);
    if (!product) return;
    setFields((f) => ({ ...f, product }));
    setPrefilled(product);
  }, [searchParams]);

  // After a failed submit has rendered its messages: shake the invalid fields
  // and move focus to the first one, so it is read out with its error.
  useEffect(() => {
    if (!afterFailedSubmit.current) return;
    afterFailedSubmit.current = false;
    const invalid = ORDER.filter((k) => errors[k]);
    invalid.forEach((k) => shake(wraps.current[k]));
    if (invalid[0]) document.getElementById(`${uid}-${invalid[0]}`)?.focus();
  }, [errors, uid]);

  useEffect(() => {
    if (status === "ok") sentHeading.current?.focus();
    if (status === "idle" && afterReset.current) {
      afterReset.current = false;
      document.getElementById(`${uid}-name`)?.focus();
    }
  }, [status, uid]);

  function set<K extends Key>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function takeFile(file: File | null) {
    setFields((f) => ({ ...f, file }));
    const problem = file ? fileProblem(file) : undefined;
    setErrors((e) => ({ ...e, file: problem }));
    if (problem) {
      shake(wraps.current.file);
      announce(problem);
    } else {
      announce(file ? `Attached ${file.name}.` : "Attachment removed.");
    }
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) takeFile(file);
  }

  function removeFile() {
    if (fileInput.current) fileInput.current.value = "";
    takeFile(null);
    fileInput.current?.focus();
  }

  const carriesFiles = (e: DragEvent) => Array.from(e.dataTransfer.types).includes("Files");

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    if (!carriesFiles(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (!dragOver) setDragOver(true);
  }

  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setDragOver(false);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    if (!carriesFiles(e)) return;
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    // Mirror the dropped file into the real input, so a native submit carries it.
    try {
      const dt = new DataTransfer();
      dt.items.add(file);
      if (fileInput.current) fileInput.current.files = dt.files;
    } catch {
      // Older browsers: the file is still held in state.
    }
    takeFile(file);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const errs = validate(fields);
    const count = Object.keys(errs).length;
    if (count > 0) {
      afterFailedSubmit.current = true;
      setErrors(errs);
      announce(`Not sent. ${count === 1 ? "One field needs" : `${count} fields need`} attention.`);
      return;
    }

    setErrors({});
    setStatus("submitting");
    announce("Sending your enquiry…");
    try {
      // TODO: wire to backend / email service.
      // Intended: POST to /api/contact as multipart/form-data (fields + drawing file).
      await new Promise((r) => setTimeout(r, 700));
      setSent(fields);
      setFields(EMPTY);
      setPrefilled("");
      setStatus("ok");
      announce("Enquiry sent. We reply within one working day.");
    } catch {
      setStatus("err");
      announce("Your enquiry was not sent. Please try again, or call us.");
    }
  }

  function sendAnother() {
    setSent(null);
    afterReset.current = true;
    setStatus("idle");
  }

  const busy = status === "submitting";
  const invalidCount = ORDER.filter((k) => errors[k]).length;
  const wrapRef = (k: Key) => (el: HTMLDivElement | null) => {
    wraps.current[k] = el;
  };
  const a11y = (k: Key, hintId?: string | false) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [hintId, errors[k] && `${fid(k)}-err`].filter(Boolean).join(" ") || undefined,
  });

  const note =
    status === "err"
      ? { text: `Not sent — something went wrong. Try again, or email ${company.email}.`, cls: "form-msg--err text-signal" }
      : busy
        ? { text: "Sending your enquiry…", cls: "text-ink-3" }
        : invalidCount > 0
          ? {
              text: invalidCount === 1 ? "Check the highlighted field." : `Check the ${invalidCount} highlighted fields.`,
              cls: "text-signal",
            }
          : { text: "We reply within one working day.", cls: "text-ink-3" };

  return (
    <div>
      <p role="status" className="sr-only">
        {live}
      </p>

      {status === "ok" && sent ? (
        <SentPanel sent={sent} headingRef={sentHeading} onAnother={sendAnother} />
      ) : (
        <form noValidate onSubmit={onSubmit} aria-labelledby={labelledBy} encType="multipart/form-data">
          <Group legend="Your details">
            <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field id={fid("name")} label="Name" required error={errors.name} wrapRef={wrapRef("name")}>
                <input
                  id={fid("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fields.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="input"
                  {...a11y("name")}
                />
              </Field>
              <Field id={fid("company")} label="Company" wrapRef={wrapRef("company")}>
                <input
                  id={fid("company")}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={fields.company}
                  onChange={(e) => set("company", e.target.value)}
                  className="input"
                />
              </Field>
              <Field id={fid("email")} label="Email" required error={errors.email} wrapRef={wrapRef("email")}>
                <input
                  id={fid("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  value={fields.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="input"
                  {...a11y("email")}
                />
              </Field>
              <Field id={fid("phone")} label="Phone" error={errors.phone} wrapRef={wrapRef("phone")}>
                <input
                  id={fid("phone")}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="input"
                  {...a11y("phone")}
                />
              </Field>
            </div>
          </Group>

          <Group legend="Your requirement">
            <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field id={fid("industry")} label="Industry" wrapRef={wrapRef("industry")}>
                <div className="relative">
                  <select
                    id={fid("industry")}
                    name="industry"
                    value={fields.industry}
                    onChange={(e) => set("industry", e.target.value)}
                    className={`input appearance-none pr-12 ${fields.industry ? "" : "text-ink-3"}`}
                  >
                    <option value="">Select an industry</option>
                    {INDUSTRY_OPTIONS.map((label) => (
                      <option key={label} value={label} className="text-ink">
                        {label}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3"
                  />
                </div>
              </Field>
              <Field
                id={fid("product")}
                label="Product or part number"
                note={prefilled && fields.product === prefilled ? "Filled in from the product page." : undefined}
                wrapRef={wrapRef("product")}
              >
                <input
                  id={fid("product")}
                  name="product"
                  type="text"
                  value={fields.product}
                  onChange={(e) => set("product", e.target.value)}
                  placeholder="e.g. Banjo fitting"
                  className="input"
                  {...a11y("product", prefilled && fields.product === prefilled && `${fid("product")}-note`)}
                />
              </Field>
              <Field
                id={fid("message")}
                label="Describe what you need"
                required
                hint="Pressure, media, temperature, end fittings and quantity — whatever you know."
                error={errors.message}
                wrapRef={wrapRef("message")}
                className="sm:col-span-2"
              >
                <textarea
                  id={fid("message")}
                  name="message"
                  required
                  rows={6}
                  value={fields.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="input min-h-[10rem] resize-y leading-relaxed"
                  {...a11y("message", `${fid("message")}-hint`)}
                />
              </Field>
            </div>
          </Group>

          <Group legend="Drawing or spec sheet" note="Optional">
            <div
              ref={wrapRef("file")}
              onAnimationEnd={endShake}
              onDragEnter={onDragOver}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <input
                ref={fileInput}
                id={fid("file")}
                name="drawing"
                type="file"
                accept={EXTENSIONS.join(",")}
                onChange={onFileChange}
                aria-label="Drawing or spec sheet (optional)"
                className="peer sr-only"
                {...a11y("file", !fields.file && `${fid("file")}-hint`)}
              />
              {fields.file ? (
                <div
                  className={`flex flex-col gap-3 border bg-paper px-4 py-3 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-brand sm:flex-row sm:items-center sm:gap-5 ${
                    errors.file ? "border-signal" : dragOver ? "border-brand" : "border-rule-2"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[0.9375rem] text-ink" title={fields.file.name}>
                      {fields.file.name}
                    </p>
                    <p className="text-sm text-ink-3">{formatBytes(fields.file.size)}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <label htmlFor={fid("file")} className="btn btn-outline btn-sm cursor-pointer">
                      Replace
                    </label>
                    <button type="button" onClick={removeFile} className="btn btn-outline btn-sm">
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor={fid("file")}
                  className={`flex cursor-pointer flex-col items-center gap-2 border border-dashed px-6 py-9 text-center transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-brand ${
                    dragOver ? "border-brand bg-brand-tint" : "border-rule-2 bg-paper-2 hover:border-ink-3"
                  }`}
                >
                  <Icon name="upload" className="h-6 w-6 text-ink-3" />
                  <span className="mt-1 text-ink">
                    <span className="font-medium text-brand underline decoration-1 underline-offset-4">
                      Choose a file
                    </span>{" "}
                    or drag it here
                  </span>
                  <span id={`${fid("file")}-hint`} className="text-[0.9375rem] text-ink-3">
                    PDF, DWG, DXF, PNG, JPG or STEP{" "}
                    <span className="hidden sm:inline">· </span>
                    <span className="block sm:inline">up&nbsp;to&nbsp;10&nbsp;MB</span>
                  </span>
                </label>
              )}
              {errors.file && (
                <p id={`${fid("file")}-err`} className="mt-2 text-[0.9375rem] leading-snug text-signal">
                  <TextWithEmail text={errors.file} />
                </p>
              )}
            </div>
          </Group>

          <div className="flex flex-col gap-4 border-t border-rule px-5 py-7 sm:flex-row sm:items-center sm:gap-6 sm:px-8 md:px-10">
            <button
              type="submit"
              aria-disabled={busy || undefined}
              className={`btn btn-primary btn-lg w-full sm:w-auto sm:min-w-[13.5rem] ${busy ? "cursor-progress" : ""}`}
            >
              {busy ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send enquiry <span className="arrow" aria-hidden="true">→</span>
                </>
              )}
            </button>
            <p key={note.text} className={`text-[0.9375rem] leading-snug ${note.cls}`}>
              <TextWithEmail text={note.text} />
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

/* ─── Pieces ────────────────────────────────────────────────────── */

function Group({ legend, note, children }: { legend: string; note?: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-rule px-5 pb-9 pt-7 first:border-t-0 sm:px-8 md:px-10">
      <legend className="float-left mb-6 flex w-full items-baseline justify-between gap-4">
        <span className="t-label !text-ink">{legend}</span>
        {note && (
          <span aria-hidden="true" className="text-sm text-ink-3">
            {note}
          </span>
        )}
      </legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  note,
  error,
  className = "",
  wrapRef,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  /** Guidance above the input */
  hint?: ReactNode;
  /** Short remark under the input (keeps side-by-side inputs aligned) */
  note?: ReactNode;
  error?: string;
  className?: string;
  wrapRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div ref={wrapRef} className={`min-w-0 ${className}`} onAnimationEnd={endShake}>
      <label htmlFor={id} className="flex flex-wrap items-baseline gap-x-2.5 font-medium leading-snug text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="t-label">
            Required
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.9375rem] leading-snug text-ink-3">
          {hint}
        </p>
      )}
      <div className="mt-2.5">{children}</div>
      {note && (
        <p id={`${id}-note`} className="mt-2 text-[0.9375rem] leading-snug text-ink-3">
          {note}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.9375rem] leading-snug text-signal">
          <TextWithEmail text={error} />
        </p>
      )}
    </div>
  );
}

function SentPanel({
  sent,
  headingRef,
  onAnother,
}: {
  sent: Fields;
  headingRef: RefObject<HTMLHeadingElement>;
  onAnother: () => void;
}) {
  const email = sent.email.trim();
  const rows: { label: string; value: ReactNode }[] = [
    { label: "Reply to", value: <BreakableEmail value={email} /> },
    { label: "Product", value: sent.product.trim() },
    { label: "Drawing", value: sent.file ? `${sent.file.name} (${formatBytes(sent.file.size)})` : "" },
  ].filter((r) => r.value);

  return (
    <div className="form-msg--ok px-5 pb-10 pt-8 sm:px-8 md:px-10 md:pb-12 md:pt-10">
      <div className="flex items-start gap-4">
        <Icon name="check" strokeWidth={2.25} className="mt-0.5 h-8 w-8 shrink-0 text-success" />
        <div className="min-w-0">
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-[2.25rem] font-semibold leading-none text-ink focus:outline-none"
          >
            Enquiry sent
          </h3>
          <p className="mt-3 max-w-[52ch] text-ink-2">
            Thank you, {sent.name.trim()}. We have your requirement and will reply within one working day.
          </p>
        </div>
      </div>

      <dl className="spec-table mt-8">
        {rows.map((r) => (
          <div key={r.label} className="spec-row sm:grid-cols-[8rem_1fr]">
            <dt>{r.label}</dt>
            <dd className="min-w-0 break-words">{r.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-ink-2">
        Urgent? Call{" "}
        <a href={company.phoneHref} className="link whitespace-nowrap">
          {company.phoneDisplay}
        </a>{" "}
        or{" "}
        <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="link">
          message us on WhatsApp
        </a>
        .
      </p>

      <button type="button" onClick={onAnother} className="btn btn-outline mt-8">
        Send another enquiry
      </button>
    </div>
  );
}
