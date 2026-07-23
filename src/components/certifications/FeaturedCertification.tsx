import Badge from "@/components/ui/Badge";

import CertificationCard from "@/components/certifications/CertificationCard";
import type { CertificationRecord } from "@/components/certifications/types";

type FeaturedCertificationProps = {
  certification: CertificationRecord;
};

export default function FeaturedCertification({ certification }: FeaturedCertificationProps) {
  return (
    <div className="space-y-3">
      <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">Featured Certification</Badge>
      <CertificationCard certification={certification} />
    </div>
  );
}
