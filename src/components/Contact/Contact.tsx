/**
 * @file components/Contact/Contact.tsx
 * @description Premium contact section with split-layout design.
 *              - Left panel: social presence, availability badge, location card
 *              - Right panel: contact form with mailto action (no server required)
 *              - Glassmorphism cards, gradient accents, Framer Motion animations
 *              - Fully static — form submits via mailto: URI (zero backend risk)
 *
 * Security: No dangerouslySetInnerHTML, no eval, no external API calls.
 *           All external links use rel="noopener noreferrer".
 *           Form values are encoded with encodeURIComponent before use in mailto:.
 */
"use client";

import { useState } from "react";
import type { ReactNode, CSSProperties, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { SITE_METADATA } from "@/lib/site-config";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/motion";

const EASE = [0.25, 0.1, 0, 1] as const;

// ─── Icon Atoms ───────────────────────────────────────────────────────────────
// Each icon is a zero-prop component — pure presentational, no state or logic.

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

// Extracted from the social card render loop for consistency with other icons above
function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--color-text-faint)", marginLeft: "auto", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Social Card Data ─────────────────────────────────────────────────────────

interface SocialCardItem {
  platform: string;
  label: string;
  handle: string;
  url: string;
  icon: ReactNode;
  color: string;
  glow: string;
  download?: string;
}

/**
 * Static social card definitions.
 * Handles and URLs are derived from SITE_METADATA to stay in sync with site-config.
 * LinkedIn handle is the only value not in SITE_METADATA — kept here as it is
 * not a general site setting and only used by this contact component.
 */
const SOCIAL_CARDS: SocialCardItem[] = [
  {
    platform: "github",
    label: "GitHub",
    handle: `@${SITE_METADATA.githubUsername}`,
    url: `https://github.com/${SITE_METADATA.githubUsername}`,
    icon: <GithubIcon />,
    color: "rgba(124, 58, 237, 0.12)",
    glow: "rgba(124, 58, 237, 0.4)",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "muazzam-mahmood",
    url: "https://www.linkedin.com/in/muazzam-mahmood/",
    icon: <LinkedInIcon />,
    color: "rgba(6, 182, 212, 0.1)",
    glow: "rgba(6, 182, 212, 0.4)",
  },
  {
    platform: "email",
    label: "Email",
    handle: SITE_METADATA.email,
    url: `mailto:${SITE_METADATA.email}`,
    icon: <EmailIcon />,
    color: "rgba(245, 158, 11, 0.1)",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  ...(SITE_METADATA.resumeUrl
    ? [
        {
          platform: "resume",
          label: "Resume",
          handle: "Download PDF",
          url: SITE_METADATA.resumeUrl,
          icon: <ResumeIcon />,
          color: "rgba(16, 185, 129, 0.1)",
          glow: "rgba(16, 185, 129, 0.4)",
          download: "Muazzam_Mahmood_Resume.pdf",
        },
      ]
    : []),
];

// ─── Form Field ───────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Accessible form field wrapper: renders a visible <label> linked to its
 * input via htmlFor/id, with an optional required asterisk.
 */
function FormField({ label, id, required, children }: FormFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--color-primary)", marginLeft: "2px" }} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Shared Input Style ───────────────────────────────────────────────────────
/**
 * Base style object applied to all <input> and <textarea> elements.
 * Focus ring is handled by the .contact-input CSS class (globals.css)
 * rather than JS DOM mutation — DRY, CSS-first, no React anti-patterns.
 */
const INPUT_STYLE: CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "var(--color-base)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text)",
  fontSize: "0.9rem",
  fontFamily: "var(--font-sans)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

// ─── Form State ───────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// ─── Contact Component ────────────────────────────────────────────────────────

export default function Contact() {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);

  /**
   * Build a mailto: URI from form fields and navigate to it.
   * Purely client-side — no data is sent to any server.
   * encodeURIComponent prevents header injection in subject/body.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, subject, message } = formState;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl =
      `mailto:${SITE_METADATA.email}` +
      `?subject=${encodeURIComponent(subject || "Portfolio Contact")}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  /** Single handler for all text inputs — keyed by input name attribute (DRY). */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      style={{
        backgroundColor: "var(--color-base)",
        padding: "4rem 1.5rem 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration orbs — aria-hidden, purely visual */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "var(--color-primary-glow)",
          filter: "blur(120px)",
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0",
          left: "-8%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "var(--color-secondary-glow)",
          filter: "blur(120px)",
          pointerEvents: "none",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Section Header ── */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-secondary)",
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              Contact
            </p>
            <h1 className="section-title">Let&apos;s Connect</h1>
            <div className="section-divider" />
            <p
              style={{
                marginTop: "1.25rem",
                color: "var(--color-text-muted)",
                fontSize: "0.97rem",
                maxWidth: "500px",
                margin: "1.25rem auto 0",
                lineHeight: 1.75,
              }}
            >
              Have a project in mind or just want to say hi? I&apos;d love to hear from you.
            </p>
          </div>
        </FadeIn>

        {/* ── Two-Column Layout ── */}
        <div className="contact-grid">

          {/* ──── Left Panel: Info & Social ──── */}
          <SlideIn direction="left">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Availability badge with pulsing dot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.5rem 1.1rem",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(34, 197, 94, 0.08)",
                  border: "1px solid rgba(34, 197, 94, 0.25)",
                  width: "fit-content",
                }}
              >
                <span style={{ position: "relative", display: "flex" }}>
                  {/* Ping animation on the green dot */}
                  <motion.span
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "var(--color-success)",
                    }}
                  />
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--color-success)",
                      display: "block",
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--color-success)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Available for opportunities
                </span>
              </motion.div>

              {/* Intro text */}
              <div>
                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Get in Touch
                </h2>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    lineHeight: 1.8,
                    fontSize: "0.93rem",
                  }}
                >
                  Whether it&apos;s a collaboration, internship opportunity, project,
                  or just a chat about tech — my inbox is always open.
                </p>
              </div>

              {/* Social link cards */}
              <StaggerContainer>
                {SOCIAL_CARDS.map((card) => (
                  <StaggerItem key={card.platform}>
                    <motion.a
                      href={card.url}
                      download={card.download}
                      target={card.platform !== "email" ? "_blank" : undefined}
                      rel={card.platform !== "email" ? "noopener noreferrer" : undefined}
                      aria-label={`${card.label}: ${card.handle}`}
                      whileHover={{
                        x: 6,
                        boxShadow: `0 4px 24px ${card.glow}22`,
                        borderColor: card.glow,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.9rem 1.1rem",
                        borderRadius: "var(--radius-lg)",
                        background: card.color,
                        border: "1px solid var(--color-border)",
                        textDecoration: "none",
                        marginBottom: "0.75rem",
                        transition: "border-color 0.2s",
                      }}
                    >
                      {/* Platform icon */}
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          borderRadius: "var(--radius-md)",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text-muted)",
                          flexShrink: 0,
                        }}
                      >
                        {card.icon}
                      </span>

                      {/* Label + handle */}
                      <div>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono)",
                            color: "var(--color-text-faint)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: "0.15rem",
                          }}
                        >
                          {card.label}
                        </p>
                        <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-text)" }}>
                          {card.handle}
                        </p>
                      </div>

                      {/* Directional affordance — extracted component (DRY) */}
                      <ArrowRightIcon />
                    </motion.a>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Location card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.85rem 1.1rem",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span style={{ color: "var(--color-secondary)" }}>
                  <LocationIcon />
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--color-text-faint)",
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Based in
                  </p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-text)" }}>
                    Lahore, Pakistan 🇵🇰
                  </p>
                </div>
              </motion.div>
            </div>
          </SlideIn>

          {/* ──── Right Panel: Contact Form ──── */}
          <SlideIn direction="right">
            {/* Plain div — no Framer Motion needed here, SlideIn already animates entry */}
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "2.25rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top gradient accent bar */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background:
                    "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                }}
              />

              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "0.35rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Send a Message
              </h2>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-text-faint)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "1.75rem",
                }}
              >
                Opens your email client — no server, no data stored.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {/* Name + Email — side by side on wider viewports */}
                <div className="contact-form-row">
                  <FormField label="Name" id="contact-name" required>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="contact-input"
                      style={INPUT_STYLE}
                    />
                  </FormField>
                  <FormField label="Email" id="contact-email" required>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="contact-input"
                      style={INPUT_STYLE}
                    />
                  </FormField>
                </div>

                <FormField label="Subject" id="contact-subject">
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formState.subject}
                    onChange={handleChange}
                    className="contact-input"
                    style={INPUT_STYLE}
                  />
                </FormField>

                <FormField label="Message" id="contact-message" required>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, opportunity, or just say hi..."
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    style={{ ...INPUT_STYLE, resize: "vertical", minHeight: "130px" }}
                  />
                </FormField>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(124, 58, 237, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.55rem",
                    padding: "0.85rem 2rem",
                    background:
                      "linear-gradient(135deg, var(--color-primary), #5B21B6)",
                    color: "#fff",
                    borderRadius: "var(--radius-full)",
                    fontWeight: 700,
                    fontSize: "0.925rem",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    width: "100%",
                    marginTop: "0.25rem",
                  }}
                >
                  <SendIcon />
                  Open Email Client
                </motion.button>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-faint)",
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Clicking above opens your default email app with the message pre-filled.
                </p>
              </form>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
