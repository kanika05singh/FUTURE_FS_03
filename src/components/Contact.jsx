import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import Reveal from "./ui/Reveal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d+\-\s()]{7,15}$/;
const MESSAGE_MAX_LENGTH = 600;

const INITIAL_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  else if (form.name.trim().length < 2) errors.name = "That name looks a little short.";

  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Please enter a valid email address.";

  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!PHONE_PATTERN.test(form.phone.trim())) errors.phone = "Please enter a valid phone number.";

  if (!form.subject.trim()) errors.subject = "Please add a subject.";

  if (!form.message.trim()) errors.message = "Please add a short message.";
  else if (form.message.trim().length < 10) errors.message = "Please add a bit more detail (10+ characters).";

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | submitted
  const [shake, setShake] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setStatus("submitting");

    // ------------------------------------------------------------------
    // NOTE: this is a frontend-only simulation — no email is actually
    // sent. To connect a real backend, replace this block with either:
    //
    //   1) A Formspree-style endpoint:
    //      await fetch("https://formspree.io/f/your-form-id", {
    //        method: "POST",
    //        headers: { "Content-Type": "application/json" },
    //        body: JSON.stringify(form),
    //      });
    //
    //   2) Your own API route:
    //      await fetch("/api/contact", {
    //        method: "POST",
    //        headers: { "Content-Type": "application/json" },
    //        body: JSON.stringify(form),
    //      });
    //
    // Keep the try/catch below so failed submissions still show an error.
    // ------------------------------------------------------------------
    try {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setStatus("submitted");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("idle");
      setErrors({ form: "Something went wrong sending that — please try again or call us directly." });
    }
  }

  const fieldClass = (hasError) =>
    `w-full rounded-md border bg-paper px-4 py-3 text-sm text-ink placeholder:text-ash/60 transition-colors focus:outline-none focus:ring-2 focus:ring-chili ${
      hasError ? "border-chili" : "border-line"
    }`;

  const messageLength = form.message.length;
  const nearLimit = messageLength > MESSAGE_MAX_LENGTH * 0.9;

  return (
    <section id="contact" className="bg-charcoal py-24 text-paper sm:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Send us a message.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/70">
            Reservations for parties of 8 or more, private dining and events — drop us a note and
            we'll get back to you within a day.
          </p>
        </Reveal>

        {status === "submitted" ? (
          <div className="animate-fade-up mt-10 flex flex-col items-center gap-3 rounded-2xl bg-charcoal-soft p-10 text-center">
            <CheckCircle2 className="animate-scale-in h-10 w-10 text-saffron" />
            <p className="font-display text-xl font-semibold">Message received.</p>
            <p className="max-w-sm text-sm text-paper/70">
              Thanks for reaching out — we'll get back to you within 24 hours. For anything urgent,
              call or WhatsApp us directly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm font-semibold text-saffron underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`mt-10 space-y-5 ${shake ? "animate-shake" : ""}`}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-paper/85">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ananya Rao"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass(errors.name)}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-chili">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-paper/85">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass(errors.email)}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-chili">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-paper/85">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={fieldClass(errors.phone)}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-xs text-chili">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-paper/85">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Table for 8 on Saturday"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={fieldClass(errors.subject)}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1.5 text-xs text-chili">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <label htmlFor="message" className="block text-sm font-medium text-paper/85">
                    Message
                  </label>
                  <span className={`text-xs tabular-nums ${nearLimit ? "text-saffron" : "text-paper/40"}`}>
                    {messageLength}/{MESSAGE_MAX_LENGTH}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={MESSAGE_MAX_LENGTH}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us the date, party size and any occasion we should know about."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldClass(errors.message)} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-chili">
                    {errors.message}
                  </p>
                )}
              </div>

              {errors.form && <p className="text-sm text-chili">{errors.form}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-chili px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-chili-dark hover:shadow-lg hover:shadow-chili/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
