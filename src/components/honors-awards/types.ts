export type RecognitionRecord = {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  issueDate: string;
  featured: boolean;
  logo: string;
  image: string;
  verificationUrl: string;
  tags: string[];
  status: string;
  displayOrder: number;
};

export type RecognitionTemplate = RecognitionRecord;

export type HonorsAwardsDataset = {
  page: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  categories: string[];
  futureRecognitionTemplates: RecognitionTemplate[];
  recognitions: RecognitionRecord[];
};

export type RecognitionMetric = {
  id: string;
  title: string;
  description: string;
  value: number;
  icon: string;
  href: string;
};
