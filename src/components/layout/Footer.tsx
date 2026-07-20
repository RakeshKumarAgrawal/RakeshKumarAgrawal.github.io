import Container from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { externalProfiles } from "@/data/externalProfiles";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="border-t border-border/60 bg-background/90 py-12">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">{profile.name}</p>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Senior Consultant working across enterprise AI research, platform engineering, and cloud architecture with a bias for clarity, resilience, and enterprise-grade delivery.
          </p>
          <p className="text-sm text-muted">© {year} {profile.name}. All rights reserved.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">External profiles</h3>
            <ul className="mt-4 space-y-4 text-sm text-muted">
              {externalProfiles.items.slice(0, 4).map((item) => (
                <li key={item.title}>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 leading-6 text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}