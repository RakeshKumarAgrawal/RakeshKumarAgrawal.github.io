export type CertificationRecord = {
  id: string;
  title: string;
  provider: string;
  category: string;
  subcategory: string;
  issueDate: string;
  credentialId: string | null;
  verificationUrl: string | null;
  skills: string[];
  description: string;
  badge: boolean;
  featured: boolean;
  active: boolean;
  logo: string;
  tags: string[];
  status: string;
  relatedTechnologies: string[];
  learningHours: number | null;
};

export type DigitalBadgeRecord = {
  id: string;
  name: string;
  issuer: string;
  category: string;
  issueDate: string;
  verificationUrl: string;
  image: string;
};

export type LearningStage = {
  id: string;
  title: string;
  description: string;
  focus: string[];
};

export type CertificationsDataset = {
  page: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  summary: {
    title: string;
    description: string;
    chips: string[];
  };
  categories: string[];
  learningJourney: LearningStage[];
  certifications: CertificationRecord[];
  digitalBadges: DigitalBadgeRecord[];
};

export type CertificationMetric = {
  id: string;
  title: string;
  description: string;
  value: number | null;
  icon: string;
  href: string;
};
