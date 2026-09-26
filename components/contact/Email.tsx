import { Fragment } from "react";
import { company, emailParts } from "@/lib/content";

/**
 * Email addresses in narrow columns: allow a line break after "@" only,
 * never mid-word (<wbr> adds nothing when the text is copied).
 */
export function CompanyEmail() {
  return (
    <>
      {emailParts[0]}@<wbr />
      {emailParts[1]}
    </>
  );
}

/** Any address (e.g. the visitor's own), split the same way. */
export function BreakableEmail({ value }: { value: string }) {
  const at = value.lastIndexOf("@");
  if (at < 0) return <>{value}</>;
  return (
    <>
      {value.slice(0, at)}@<wbr />
      {value.slice(at + 1)}
    </>
  );
}

/** A sentence that mentions the company email, with the same break rule. */
export function TextWithEmail({ text }: { text: string }) {
  return (
    <>
      {text.split(company.email).map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <CompanyEmail />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
