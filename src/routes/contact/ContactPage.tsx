import { useState } from "react";

type ContactValues = {
  email: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const INITIAL_VALUES: ContactValues = {
  email: "",
  message: ""
};

function validateContact(values: ContactValues) {
  const errors: ContactErrors = {};
  const emailValue = values.email.trim();
  const messageValue = values.message.trim();

  if (!emailValue) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    errors.email = "Enter a valid email address.";
  }

  if (!messageValue) {
    errors.message = "Message is required.";
  } else if (messageValue.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export function ContactPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");

  const handleChange =
    (field: keyof ContactValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setValues((current) => ({ ...current, [field]: nextValue }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setSubmitState("idle");
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      return;
    }

    setSubmitState("success");
    setValues(INITIAL_VALUES);
  };

  return (
    <section className="contact-page">
      <div className="static-page-inner">
        <h1>Contact Us</h1>
        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          ) : null}
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write your message"
            value={values.message}
            onChange={handleChange("message")}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message ? (
            <p id="message-error" className="form-error" role="alert">
              {errors.message}
            </p>
          ) : null}
          <button type="submit">Send</button>
          {submitState === "success" ? (
            <p className="form-success" role="status">
              Message validated and ready to send.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
