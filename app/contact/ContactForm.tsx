"use client";

import { useId, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  segment: string;
  product: string;
  message: string;
  file: File | null;
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  segment: "",
  product: "",
  message: "",
  file: null,
};

const segments = [
  "Construction machinery",
  "Cement",
  "Water well drilling rigs",
  "Injection moulding",
  "Paper industry",
  "Machine tools",
  "Surface & underground mining",
  "Defence",
  "Oil & gas",
  "Automobile",
  "Other",
];

function validate(state: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!state.name.trim()) errors.name = "Name is required.";
  if (!state.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!state.message.trim() || state.message.trim().length < 10) {
    errors.message = "Tell us a bit more (at least 10 characters).";
  }
  if (state.phone && !/^[+\d\s()-]{7,}$/.test(state.phone)) {
    errors.phone = "Phone format looks off.";
  }
  if (state.file && state.file.size > 10 * 1024 * 1024) {
    errors.file = "File must be under 10 MB.";
  }
  return errors;
}

export function ContactForm() {
  const formId = useId();
  const searchParams = useSearchParams();
  const [state, setState] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const [msgKey, setMsgKey] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Feature 11 — Auto-populate product field from URL search param ?product=
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      setState((s) => ({ ...s, product: decodeURIComponent(productParam) }));
    }
  }, [searchParams]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
      const el = fieldRefs.current[key];
      if (el) el.classList.remove("field--err");
    }
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) update("file", file);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(state);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      Object.keys(errs).forEach((k) => {
        const el = fieldRefs.current[k];
        if (el) {
          el.classList.remove("field--err");
          void el.offsetWidth;
          el.classList.add("field--err");
        }
      });
      setShakeKey((k) => k + 1);
      fieldRefs.current[first]
        ?.querySelector<HTMLElement>("input,textarea,select")
        ?.focus();
      return;
    }

    setStatus("submitting");
    try {
      // TODO: wire to backend / email service.
      // Intended: POST to /api/contact (multipart/form-data for file upload).
      await new Promise((r) => setTimeout(r, 700));
      setStatus("ok");
      setMsgKey((k) => k + 1);
      setState(initial);
    } catch {
      setStatus("err");
      setMsgKey((k) => k + 1);
    }
  }

  const fieldId = (k: keyof FormState) => `${formId}-${k}`;
  const errId = (k: keyof FormState) => `${formId}-${k}-err`;

  return (
    <form
      key={shakeKey}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={`${formId}-help`}
      className="border border-line-1 bg-surface-0"
      data-anim="fade-up"
    >
      <div className="border-b border-line-1 px-6 py-4 font-mono text-micro tracking-label uppercase text-ink-3 md:px-8 flex items-center justify-between">
        <span>FORM / IH-C-01 · FIELDS MARKED * REQUIRED</span>
        <span className="hidden sm:inline-flex items-center gap-2 text-ink-3">
          <span className="breathe inline-block w-1.5 h-1.5 bg-success rounded-full" aria-hidden="true" />
          ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-line-1 sm:grid-cols-2">
        {/* Name */}
        <div
          className="field bg-surface-0 px-6 py-5 md:px-8"
          ref={(el) => { fieldRefs.current.name = el; }}
        >
          <label
            htmlFor={fieldId("name")}
            className="block font-mono text-micro tracking-label uppercase text-ink-3"
          >
            Name *
          </label>
          <input
            id={fieldId("name")}
            type="text"
            required
            autoComplete="name"
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? errId("name") : undefined}
            className="mt-2 block w-full border-0 border-b border-line-2 bg-transparent px-0 py-2 text-base text-ink-1 outline-none focus:border-transparent"
          />
          {errors.name && (
            <p id={errId("name")} className="mt-2 text-xs text-danger">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company */}
        <div
          className="field bg-surface-0 px-6 py-5 md:px-8"
          ref={(el) => { fieldRefs.current.company = el; }}
        >
          <label
            htmlFor={fieldId("company")}
            className="block font-mono text-micro tracking-label uppercase text-ink-3"
          >
            Company
          </label>
          <input
            id={fieldId("company")}
            type="text"
            autoComplete="organization"
            value={state.company}
            onChange={(e) => update("company", e.target.value)}
            className="mt-2 block w-full border-0 border-b border-line-2 bg-transparent px-0 py-2 text-base text-ink-1 outline-none focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div
          className="field bg-surface-0 px-6 py-5 md:px-8"
          ref={(el) => { fieldRefs.current.email = el; }}
        >
          <label
            htmlFor={fieldId("email")}
            className="block font-mono text-micro tracking-label uppercase text-ink-3"
          >
            Email *
          </label>
          <input
            id={fieldId("email")}
            type="email"
            required
            autoComplete="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? errId("email") : undefined}
            className="mt-2 block w-full border-0 border-b border-line-2 bg-transparent px-0 py-2 text-base text-ink-1 outline-none focus:border-transparent"
          />
          {errors.email && (
            <p id={errId("email")} className="mt-2 text-xs text-danger">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div
          className="field bg-surface-0 px-6 py-5 md:px-8"
          ref={(el) => { fieldRefs.current.phone = el; }}
        >
          <label
            htmlFor={fieldId("phone")}
            className="block font-mono text-micro tracking-label uppercase text-ink-3"
          >
            Phone
          </label>
          <input
            id={fieldId("phone")}
            type="tel"
            autoComplete="tel"
            value={state.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? errId("phone") : undefined}
            className="mt-2 block w-full border-0 border-b border-line-2 bg-transparent px-0 py-2 text-base text-ink-1 outline-none focus:border-transparent"
          />
          {errors.phone && (
            <p id={errId("phone")} className="mt-2 text-xs text-danger">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Segment */}
      <div
        className="field border-t border-line-1 bg-surface-0 px-6 py-5 md:px-8"
        ref={(el) => { fieldRefs.current.segment = el; }}
      >
        <label
          htmlFor={fieldId("segment")}
          className="block font-mono text-micro tracking-label uppercase text-ink-3"
        >
          Industry segment
        </label>
        <select
          id={fieldId("segment")}
          value={state.segment}
          onChange={(e) => update("segment", e.target.value)}
          className="mt-2 block w-full appearance-none border-0 border-b border-line-2 bg-transparent px-0 py-2 text-base text-ink-1 outline-none focus:border-transparent"
        >
          <option value="">Select…</option>
          {segments.map((s) => (
            <option key={s} value={s} className="bg-surface-0 text-ink-1">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Feature 11 — Product field (auto-populated from ?product= URL param) */}
      <div
        className="field border-t border-line-1 bg-surface-0 px-6 py-5 md:px-8"
        ref={(el) => { fieldRefs.current.product = el; }}
      >
        <label
          htmlFor={fieldId("product")}
          className="block font-mono text-micro tracking-label uppercase text-ink-3"
        >
          Product of interest
          {state.product && (
            <span className="ml-2 inline-flex items-center gap-1 text-[9px] bg-brand/10 text-brand border border-brand/30 px-1.5 py-0.5">
              AUTO-FILLED
            </span>
          )}
        </label>
        <input
          id={fieldId("product")}
          type="text"
          value={state.product}
          onChange={(e) => update("product", e.target.value)}
          placeholder="e.g. SAE Flange Fitting, Boom Hose Assembly…"
          className="mt-2 block w-full border-0 border-b border-line-2 bg-transparent px-0 py-2 text-base text-ink-1 placeholder:text-ink-3/60 outline-none focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div
        className="field border-t border-line-1 bg-surface-0 px-6 py-5 md:px-8"
        ref={(el) => { fieldRefs.current.message = el; }}
      >
        <label
          htmlFor={fieldId("message")}
          className="block font-mono text-micro tracking-label uppercase text-ink-3"
        >
          Message *
        </label>
        <textarea
          id={fieldId("message")}
          required
          rows={5}
          value={state.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? errId("message") : undefined}
          className="mt-2 block w-full resize-y border-0 border-b border-line-2 bg-transparent px-0 py-2 text-base leading-relaxed text-ink-1 outline-none focus:border-transparent"
          placeholder="Pressure, duty, standard reference, quantity, end fittings…"
        />
        {errors.message && (
          <p id={errId("message")} className="mt-2 text-xs text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {/* Feature 11 — File upload (drawings / specs) */}
      <div
        className="border-t border-line-1 bg-surface-0 px-6 py-5 md:px-8"
        ref={(el) => { fieldRefs.current.file = el; }}
      >
        <p className="block font-mono text-micro tracking-label uppercase text-ink-3 mb-3">
          Attach drawing or spec sheet{" "}
          <span className="text-[9px] normal-case tracking-normal text-ink-3/70">(optional · PDF, DWG, PNG — max 10 MB)</span>
        </p>

        {/* Drag-and-drop zone */}
        <div
          className={`relative border border-dashed p-6 text-center transition-colors duration-180 cursor-pointer ${
            dragOver
              ? "border-brand bg-brand/5"
              : state.file
              ? "border-success bg-success/5"
              : "border-line-2 hover:border-brand hover:bg-surface-3/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload drawing or specification file"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            id={fieldId("file")}
            type="file"
            accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.step,.stp"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              update("file", file);
            }}
          />

          {state.file ? (
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-success shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm text-ink-1 font-medium truncate max-w-[200px]">
                {state.file.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  update("file", null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-ink-3 hover:text-danger transition-colors text-xs font-mono shrink-0"
                aria-label="Remove file"
              >
                REMOVE
              </button>
            </div>
          ) : (
            <div>
              <svg className="mx-auto w-8 h-8 text-ink-3 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-ink-2">
                <span className="text-brand font-medium">Click to upload</span> or drag & drop
              </p>
              <p className="mt-1 text-xs text-ink-3 font-mono">PDF · DWG · DXF · PNG · JPG · STEP</p>
            </div>
          )}
        </div>
        {errors.file && (
          <p className="mt-2 text-xs text-danger">{errors.file}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-line-1 bg-surface-1 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p
          id={`${formId}-help`}
          key={msgKey}
          className={`font-mono text-micro tracking-label uppercase text-ink-3 ${
            status === "ok" ? "form-msg--ok text-success" :
            status === "err" ? "form-msg--err text-danger" : ""
          }`}
        >
          {status === "ok" ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8.5L6.5 12L13 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  style={{
                    strokeDasharray: 20,
                    strokeDashoffset: 20,
                    animation: "drawIn 0.45s 0.05s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                  }}
                />
              </svg>
              ENQUIRY SENT — WE&apos;LL BE IN TOUCH.
            </span>
          ) : status === "err" ? (
            <span>SOMETHING WENT WRONG — CALL US DIRECTLY.</span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span className="breathe inline-block w-1.5 h-1.5 bg-accent rounded-full" aria-hidden="true" />
              WE RESPOND WITHIN 1 WORKING DAY.
            </span>
          )}
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary press disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
