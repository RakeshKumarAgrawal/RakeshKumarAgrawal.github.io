import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import ExecutiveProfileCard from "@/components/profile/ExecutiveProfileCard";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Verified contact channels with professional profile context.",
  canonical: "/contact",
  keywords: ["contact", "professional profile", "research"],
});

export default function ContactPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Contact" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Contact"
          title="Professional Contact"
          description="Reach out through verified professional channels with clear context for collaboration, speaking, and research work."
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <Card className="space-y-4 p-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Contact Form</h2>
          <p className="text-sm leading-7 text-muted">Share your project, research interest, or speaking request. This form opens your mail client with prefilled details.</p>

          <form
            action="mailto:rkagrawal@ieee.org"
            method="post"
            encType="text/plain"
            className="space-y-4"
            aria-label="Professional contact form"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="h-11 w-full rounded-xl border border-border/75 bg-white/5 px-3 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Work Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-11 w-full rounded-xl border border-border/75 bg-white/5 px-3 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                className="h-11 w-full rounded-xl border border-border/75 bg-white/5 px-3 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                className="w-full rounded-xl border border-border/75 bg-white/5 px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full border border-primary/20 bg-primary px-5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
            >
              Send Message
            </button>
          </form>

          <div className="flex flex-wrap gap-2 border-t border-border/70 pt-3">
            {profile.verifiedEmails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="rounded-full border border-border/70 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                {email}
              </a>
            ))}
          </div>
        </Card>

        <ExecutiveProfileCard variant="compact" />
      </div>
    </SectionPageLayout>
  );
}
