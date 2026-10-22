"use client";

import { useEffect, useRef, useState } from "react";
import { LuCircleCheck, LuCircleX, LuChevronDown, LuLoaderCircle, LuSend, LuX } from "react-icons/lu";
import { getLenis } from "../lib/lenis";
import { PROFILE } from "../lib/profile";
import { buttonSweep } from "../lib/ui";

const PROJECT_TYPES = [
  "Website",
  "Web app",
  "CMS / Admin dashboard",
  "SEO & performance",
  "Job opportunity",
];
const BUDGETS = ["Under ₹50,000", "₹50,000 to ₹1,00,000", "₹1,00,000 to ₹3,00,000", "Above ₹3,00,000", "Not sure yet"];

const fieldBase =
  "w-full border bg-field-bg px-3.5 py-2.5 text-base text-title placeholder:text-text/70 transition-colors focus:outline-none";
const fieldClass = (invalid?: boolean) =>
  `${fieldBase} ${invalid ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"}`;
const labelClass = "mb-1.5 block text-xs font-semibold text-title";
const errorClass = "mt-1.5 text-xs text-red-600 dark:text-red-400";

const MAX_LENGTH = { name: 60, email: 254, message: 2000 };
const MESSAGE_MIN = 20;

type Field = "name" | "email" | "projectType" | "budget" | "message";
type Errors = Partial<Record<Field, string>>;

/** The error message for a field, or undefined when it's valid. Every field is required. */
function validate(field: Field, raw: string) {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length < 2) return "Name should be at least 2 characters.";
      if (!/^\p{L}[\p{L}\s.'-]*$/u.test(value)) return "Name can only contain letters, spaces, dots, apostrophes and hyphens.";
      return undefined;
    case "email":
      if (!value) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Please enter a valid email address, like name@company.com.";
      return undefined;
    case "projectType":
      return value ? undefined : "Please choose what you'd like to talk about.";
    case "budget":
      return value ? undefined : "Please choose a budget range (or “Not sure yet”).";
    case "message":
      if (!value) return "Please write a message.";
      if (value.length < MESSAGE_MIN)
        return `Please add a little more detail: at least ${MESSAGE_MIN} characters (${MESSAGE_MIN - value.length} to go).`;
      return undefined;
  }
}

// Web3Forms access key (public by design: it only lets this form send to Mansi's inbox)
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

/** Sends the message through Web3Forms (https://web3forms.com), which emails it to Mansi. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sender, setSender] = useState("");
  const [projectType, setProjectType] = useState("");
  const isJob = projectType === "Job opportunity";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [messageLength, setMessageLength] = useState(0);

  // Show the result in a popup once sending finishes, and freeze the page behind it
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || (status !== "sent" && status !== "error") || dialog.open) return;
    dialog.showModal();
    getLenis()?.stop();
  }, [status]);

  const closeDialog = () => dialogRef.current?.close();

  // A field is checked when the visitor leaves it; once it shows an error it's re-checked as
  // they type, so the error clears as soon as it's fixed
  const checkField = (field: Field, value: string) =>
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  const fieldProps = (field: Field) => ({
    name: field,
    required: true,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      checkField(field, event.target.value),
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (field === "message") setMessageLength(event.target.value.length);
      if (errors[field]) checkField(field, event.target.value);
    },
  });
  const fieldError = (field: Field) =>
    errors[field] && (
      <p id={`contact-${field}-error`} className={errorClass}>
        {errors[field]}
      </p>
    );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Check every field (budget only when it's shown); stop and focus the first problem
    const fields: Field[] = ["name", "email", "projectType", ...(isJob ? [] : ["budget" as const]), "message"];
    const found: Errors = {};
    for (const field of fields) found[field] = validate(field, String(data.get(field) ?? ""));
    setErrors(found);
    const firstInvalid = fields.find((field) => found[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");

    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    setSender(name.split(" ")[0]);
    const type = String(data.get("projectType"));
    const budget = isJob ? null : String(data.get("budget"));

    try {
      if (!WEB3FORMS_KEY) throw new Error("NEXT_PUBLIC_WEB3FORMS_KEY is not set");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // Web3Forms has no custom email templates, so the email is shaped here: the subject and
        // sender name, then every other field as a "Label: value" row, in this order
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: isJob
            ? `Job opportunity from ${name}`
            : `New ${type} enquiry from ${name} (Budget: ${budget})`,
          from_name: "Mansi Kamble Portfolio Contact Form",
          replyto: email, // hitting Reply answers the visitor directly
          Name: name,
          Email: email,
          "Project type": type,
          ...(budget && { Budget: budget }),
          Message: String(data.get("message")).trim(),
          "Submitted on": new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
          }),
          "Submitted from": window.location.href,
          botcheck: data.get("botcheck"), // spam trap: Web3Forms drops the submission when it's filled
        }),
      });
      const result: { success?: boolean } = await response.json();
      if (!response.ok || !result.success) throw new Error("Web3Forms rejected the submission");

      form.reset();
      setProjectType("");
      setMessageLength(0);
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <>
      {/* theme-reset: the card uses the normal page colours (white in light mode) inside the dark band */}
      <form
        onSubmit={handleSubmit}
        noValidate // every field is checked by validate() above, with the error shown under it
        aria-labelledby="contact-form-title"
        data-reveal="up"
        className="theme-reset self-start border border-border bg-card-bg p-6 sm:p-8"
      >
        <h3 id="contact-form-title" className="text-lg font-semibold text-title">
          Send a message
        </h3>
        <p className="mt-1 text-xs text-text">A few details help me reply with a useful first answer. All fields are required.</p>

        {/* Spam trap: hidden from people, but bots fill it in */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Name
            </label>
            <input
              id="contact-name"
              {...fieldProps("name")}
              maxLength={MAX_LENGTH.name}
              autoComplete="name"
              placeholder="Your full name"
              className={fieldClass(Boolean(errors.name))}
            />
            {fieldError("name")}
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              {...fieldProps("email")}
              type="email"
              maxLength={MAX_LENGTH.email}
              autoComplete="email"
              placeholder="you@company.com"
              className={fieldClass(Boolean(errors.email))}
            />
            {fieldError("email")}
          </div>
        </div>

        <fieldset
          className="mt-5"
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "contact-projectType-error" : undefined}
        >
          <legend className={labelClass}>Project type</legend>
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((type) => (
              <label key={type} className="cursor-pointer">
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  required
                  checked={projectType === type}
                  onChange={() => {
                    setProjectType(type);
                    checkField("projectType", type);
                  }}
                  className="peer sr-only"
                />
                <span
                  className={`block border px-3.5 py-1.5 text-xs capitalize font-semibold text-title transition-colors hover:border-accent peer-checked:border-title peer-checked:bg-title peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent dark:peer-checked:border-accent dark:peer-checked:bg-accent dark:peer-checked:text-white ${
                    errors.projectType ? "border-red-500" : "border-border"
                  }`}
                >
                  {type}
                </span>
              </label>
            ))}
          </div>
          {fieldError("projectType")}
        </fieldset>

        {/* No budget for job opportunities */}
        {!isJob && (
          <div className="mt-5">
            <label htmlFor="contact-budget" className={labelClass}>
              Budget
            </label>
            <div className="relative">
              <select
                id="contact-budget"
                {...fieldProps("budget")}
                defaultValue=""
                className={`${fieldClass(Boolean(errors.budget))} appearance-none pr-10 invalid:text-text/70`}
              >
                <option value="" disabled>
                  Select a budget range
                </option>
                {BUDGETS.map((budget) => (
                  <option key={budget}>{budget}</option>
                ))}
              </select>
              <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-title" aria-hidden="true" />
            </div>
            {fieldError("budget")}
          </div>
        )}

        <div className="mt-5">
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            {...fieldProps("message")}
            maxLength={MAX_LENGTH.message}
            rows={4}
            placeholder="Tell me about your project, timeline and goals"
            className={`${fieldClass(Boolean(errors.message))} resize-y`}
          />
          <div className="flex items-start justify-between gap-3">
            {fieldError("message") || <span />}
            <span className="mt-1.5 shrink-0 text-xs tabular-nums text-text">
              {messageLength} / {MAX_LENGTH.message}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`${buttonSweep} mt-6 disabled:cursor-wait disabled:opacity-70 flex w-full items-center justify-center gap-2 bg-button px-4 py-2.5 text-sm font-semibold sm:px-5 sm:py-3 sm:text-base text-white [--sweep:var(--title)] dark:hover:text-bg`}
        >
          {status === "sending" ? (
            <LuLoaderCircle className="size-3.5 animate-spin sm:size-4" aria-hidden="true" />
          ) : (
            <LuSend className="size-3.5 sm:size-4" aria-hidden="true" />
          )}
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </form>

      {/* Result popup. theme-reset: normal page colours, like the form card. Esc, the backdrop
          and the buttons all close it; onClose restarts the page scroll. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="contact-result-title"
        aria-describedby="contact-result-text"
        onClose={() => {
          getLenis()?.start();
          setStatus("idle");
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="theme-reset m-auto w-[min(100%-2rem,28rem)] border border-border bg-card-bg p-6 text-center text-text backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:p-8 motion-safe:transition-[opacity,scale] motion-safe:duration-300 motion-safe:starting:open:scale-95 motion-safe:starting:open:opacity-0"
      >
        <button
          type="button"
          onClick={closeDialog}
          aria-label="Close"
          className="absolute right-3 top-3 grid size-8 place-items-center border border-border text-title transition-colors hover:border-accent hover:text-accent"
        >
          <LuX className="size-4" aria-hidden="true" />
        </button>

        {status === "error" ? (
          <>
            <LuCircleX className="mx-auto size-14 text-red-500" aria-hidden="true" />
            <h3 id="contact-result-title" className="mt-4 text-xl font-semibold text-title">
              Message not sent
            </h3>
            <p id="contact-result-text" className="mt-2 text-sm">
              Something went wrong while sending your message. Please try again, or email me directly at{" "}
              <a href={`mailto:${PROFILE.email}`} className="font-semibold text-accent underline">
                {PROFILE.email}
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                autoFocus
                onClick={closeDialog}
                className={`${buttonSweep} bg-button px-5 py-2.5 text-sm font-semibold text-white [--sweep:var(--title)] dark:hover:text-bg`}
              >
                Try again
              </button>
              <a
                href={`mailto:${PROFILE.email}`}
                className={`${buttonSweep} border border-border px-5 py-2.5 text-sm font-semibold text-title [--sweep:var(--accent)] hover:border-accent hover:text-white`}
              >
                Email me
              </a>
            </div>
          </>
        ) : (
          <>
            <LuCircleCheck className="mx-auto size-14 text-emerald-500" aria-hidden="true" />
            <h3 id="contact-result-title" className="mt-4 text-xl font-semibold text-title">
              Message sent!
            </h3>
            <p id="contact-result-text" className="mt-2 text-sm">
              Thanks{sender && `, ${sender}`}! Your message is in my inbox and I&rsquo;ll get back to you soon.
            </p>
            <button
              type="button"
              autoFocus
              onClick={closeDialog}
              className={`${buttonSweep} mt-6 bg-button px-6 py-2.5 text-sm font-semibold text-white [--sweep:var(--title)] dark:hover:text-bg`}
            >
              Done
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
