"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { submitInquiry } from "@/app/[lang]/contact/actions";
import {
  EMPTY_INQUIRY,
  validateInquiry,
  type InquiryErrors,
  type InquiryFieldError,
  type InquiryValues,
} from "@/lib/contact-form";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Field error codes are language-free; this is where they become copy. */
function fieldErrorMessage(
  code: InquiryFieldError,
  dict: Dictionary,
): string {
  switch (code) {
    case "name-required":
      return dict.contact.errorNameRequired;
    case "email-required":
      return dict.contact.errorEmailRequired;
    case "email-invalid":
      return dict.contact.errorEmailInvalid;
    case "message-required":
      return dict.contact.errorMessageRequired;
  }
}

const FIELD_CLASS =
  "rounded-lg border border-neutral-200 bg-white text-sm leading-[1.5] text-neutral-950 placeholder:text-neutral-400";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  multiline = false,
}: {
  label: string;
  name: keyof InquiryValues;
  type?: "text" | "email";
  placeholder: string;
  value: string;
  error?: string;
  onChange: (name: keyof InquiryValues, value: string) => void;
  multiline?: boolean;
}) {
  const errorId = `${name}-error`;
  const hasError = Boolean(error);

  const fieldProps = {
    id: name,
    name,
    value,
    placeholder,
    "aria-invalid": hasError,
    "aria-describedby": hasError ? errorId : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(name, event.target.value),
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm leading-[1.5] text-neutral-600">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...fieldProps}
          className={`${FIELD_CLASS} h-[125px] resize-none p-3`}
        />
      ) : (
        <input
          {...fieldProps}
          type={type}
          className={`${FIELD_CLASS} h-[45px] px-3`}
        />
      )}
      {hasError ? (
        <p id={errorId} className="text-sm leading-[1.5] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [values, setValues] = useState<InquiryValues>(EMPTY_INQUIRY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  function updateValue(name: keyof InquiryValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    const result = await submitInquiry(values);

    if (result.ok) {
      setValues(EMPTY_INQUIRY);
      setStatus("success");
      return;
    }

    setSubmitError(
      result.code === "invalid"
        ? dict.contact.errorValidation
        : dict.contact.errorSubmit,
    );
    setStatus("error");
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <Field
          label={dict.contact.fieldName}
          name="name"
          placeholder={dict.contact.fieldNamePlaceholder}
          value={values.name}
          error={errors.name ? fieldErrorMessage(errors.name, dict) : undefined}
          onChange={updateValue}
        />
        <Field
          label={dict.contact.fieldEmail}
          name="email"
          type="email"
          placeholder={dict.contact.fieldEmailPlaceholder}
          value={values.email}
          error={
            errors.email ? fieldErrorMessage(errors.email, dict) : undefined
          }
          onChange={updateValue}
        />
        <Field
          label={dict.contact.fieldSubject}
          name="subject"
          placeholder={dict.contact.fieldSubjectPlaceholder}
          value={values.subject}
          onChange={updateValue}
        />
        <Field
          label={dict.contact.fieldMessage}
          name="message"
          placeholder={dict.contact.fieldMessagePlaceholder}
          value={values.message}
          error={
            errors.message ? fieldErrorMessage(errors.message, dict) : undefined
          }
          onChange={updateValue}
          multiline
        />
      </div>
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-10 w-fit items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {dict.contact.submit}
        </button>
        {status === "success" ? (
          <p role="status" className="text-sm leading-[1.5] text-neutral-600">
            {dict.contact.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="text-sm leading-[1.5] text-red-600">
            {submitError}
          </p>
        ) : null}
      </div>
    </form>
  );
}
