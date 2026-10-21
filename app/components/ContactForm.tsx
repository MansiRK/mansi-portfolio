"use client";

import { useState } from "react";
import { LuChevronDown, LuSend } from "react-icons/lu";
import { PROFILE } from "../lib/profile";

const PROJECT_TYPES = ["Website", "Web app", "AI integration", "Other"];
const BUDGETS = ["Under ₹50,000", "₹50,000 to ₹1,00,000", "₹1,00,000 to ₹3,00,000", "Above ₹3,00,000", "Not sure yet"];

const fieldClass =
  "w-full border border-border bg-field-bg px-3.5 py-2.5 text-sm text-title placeholder:text-text/70 transition-colors focus:border-accent focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-semibold text-title";

/**
 * There is no backend yet, so submitting opens the visitor's email app with the
 * message pre-filled. Swap `handleSubmit` for a form service (Formspree, Resend, ...) later.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `New ${data.get("projectType")} enquiry from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Project type: ${data.get("projectType")}`,
      `Budget: ${data.get("budget")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");

    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    // theme-reset: the card uses the normal page colours (white in light mode) inside the dark band
    <form
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      data-reveal="up"
      className="theme-reset self-start border border-border bg-card-bg p-6 sm:p-8"
    >
      <h3 id="contact-form-title" className="text-lg font-semibold text-title">
        Send a message
      </h3>
      <p className="mt-1 text-xs text-text">A few details help me reply with a useful first answer.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input id="contact-name" name="name" required autoComplete="name" placeholder="Your full name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelClass}>Project type</legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type, index) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="projectType" value={type} defaultChecked={index === 0} className="peer sr-only" />
              <span className="block border border-border px-3.5 py-1.5 text-xs font-semibold text-title transition-colors hover:border-accent peer-checked:border-title peer-checked:bg-title peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent dark:peer-checked:border-accent dark:peer-checked:bg-accent dark:peer-checked:text-white">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="contact-budget" className={labelClass}>
          Budget
        </label>
        <div className="relative">
          <select id="contact-budget" name="budget" className={`${fieldClass} appearance-none pr-10`}>
            {BUDGETS.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
          <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-title" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Tell me about your project, timeline and goals"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 bg-button px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <LuSend className="size-4" aria-hidden="true" />
        Send message
      </button>

      <p role="status" className="mt-3 text-xs text-text">
        {sent && `Your email app should open with the message ready. If it doesn't, write to ${PROFILE.email}.`}
      </p>
    </form>
  );
}
