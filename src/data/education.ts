import { orcidSource } from "./sources";

export const educationItems = [
  {
    institution: "Kennedy University",
    qualification: "Master of Business Administration",
    specialization: "Business Analytics and Artificial Intelligence Management",
    period: "2025",
    grade: "3.44",
    evidence: ["Degree certificate", "LinkedIn"],
  },
  {
    institution: "Kennedy University",
    qualification: "Doctor of Philosophy",
    specialization: "Artificial Intelligence, Machine Learning, and Data Science",
    period: "2026",
    grade: "3.6",
    evidence: ["Degree certificate", "LinkedIn", "User confirmation"],
  },
  {
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    location: "Lucknow, Uttar Pradesh, IN",
    qualification: "Bachelor of Technology (Electronics and Communications)",
    period: "2002-07-01 to 2006-06-30",
    evidence: ["ORCID public record"],
    ...orcidSource,
  },
] as const;

export const education = {
  eyebrow: "Education",
  title: "Education",
  description: "Academic qualifications and their supporting sources.",
  items: educationItems,
} as const;
