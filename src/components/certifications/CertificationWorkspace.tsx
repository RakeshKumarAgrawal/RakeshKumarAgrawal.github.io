"use client";

import { useMemo, useState } from "react";

import CertificationCard from "@/components/certifications/CertificationCard";
import CertificationDashboard from "@/components/certifications/CertificationDashboard";
import CertificationFilters from "@/components/certifications/CertificationFilters";
import CertificationSearch from "@/components/certifications/CertificationSearch";
import CertificationTimeline from "@/components/certifications/CertificationTimeline";
import DigitalBadgeGrid from "@/components/certifications/DigitalBadgeGrid";
import FeaturedCertification from "@/components/certifications/FeaturedCertification";
import LearningJourney from "@/components/certifications/LearningJourney";
import ProviderCard from "@/components/certifications/ProviderCard";
import SkillsMatrix from "@/components/certifications/SkillsMatrix";
import type {
	CertificationMetric,
	CertificationRecord,
	CertificationsDataset,
} from "@/components/certifications/types";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

type CertificationWorkspaceProps = {
	dataset: CertificationsDataset;
};

const filterGroups = [
	"All",
	"AI",
	"Cloud",
	"Platform",
	"DevOps",
	"SRE",
	"Security",
	"PM",
	"Professional",
	"Badges",
] as const;

const metricCategories = {
	ai: [/\bai\b/i, /generative ai/i, /llmops/i],
	cloud: [/cloud/i, /aws/i, /azure/i],
	platform: [/platform/i, /architecture/i],
	devopsSre: [/devops/i, /sre/i, /site reliability/i],
	projectManagement: [/project management/i, /\bpm\b/i, /pmi/i],
	professional: [/professional/i, /member/i, /fellow/i, /review/i],
	badges: [/badge/i],
} as const;

const belongsToGroup = (item: CertificationRecord, group: string) => {
	const text = `${item.title} ${item.provider} ${item.category} ${item.subcategory} ${item.skills.join(" ")} ${item.tags.join(" ")}`;

	if (group === "All") {
		return true;
	}

	if (group === "AI") {
		return metricCategories.ai.some((pattern) => pattern.test(text));
	}

	if (group === "Cloud") {
		return metricCategories.cloud.some((pattern) => pattern.test(text));
	}

	if (group === "Platform") {
		return metricCategories.platform.some((pattern) => pattern.test(text));
	}

	if (group === "DevOps") {
		return /devops/i.test(text);
	}

	if (group === "SRE") {
		return metricCategories.devopsSre.some((pattern) => pattern.test(text));
	}

	if (group === "Security") {
		return /security/i.test(text);
	}

	if (group === "PM") {
		return metricCategories.projectManagement.some((pattern) => pattern.test(text));
	}

	if (group === "Professional") {
		return metricCategories.professional.some((pattern) => pattern.test(text));
	}

	if (group === "Badges") {
		return item.badge || metricCategories.badges.some((pattern) => pattern.test(text));
	}

	return true;
};

const getLifetimeLearningHours = (records: CertificationRecord[]) => {
	const values = records.map((item) => item.learningHours).filter((value): value is number => value !== null);

	if (!values.length) {
		return null;
	}

	return values.reduce((sum, value) => sum + value, 0);
};

export default function CertificationWorkspace({ dataset }: CertificationWorkspaceProps) {
	const [activeGroup, setActiveGroup] = useState<string>("All");
	const [activeProvider, setActiveProvider] = useState<string>("All");
	const [activeYear, setActiveYear] = useState<string>("All");
	const [searchValue, setSearchValue] = useState<string>("");

	const providers = useMemo(
		() => Array.from(new Set(dataset.certifications.map((item) => item.provider))).sort((a, b) => a.localeCompare(b)),
		[dataset.certifications],
	);

	const years = useMemo(
		() =>
			Array.from(new Set(dataset.certifications.map((item) => item.issueDate.slice(0, 4))))
				.sort((a, b) => b.localeCompare(a)),
		[dataset.certifications],
	);

	const filteredCertifications = useMemo(() => {
		const normalizedSearch = searchValue.trim().toLowerCase();

		return dataset.certifications.filter((item) => {
			const matchesGroup = belongsToGroup(item, activeGroup);
			const matchesProvider = activeProvider === "All" || item.provider === activeProvider;
			const matchesYear = activeYear === "All" || item.issueDate.startsWith(activeYear);
			const haystack = `${item.title} ${item.provider} ${item.category} ${item.skills.join(" ")} ${item.relatedTechnologies.join(" ")} ${item.tags.join(" ")}`.toLowerCase();
			const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);

			return matchesGroup && matchesProvider && matchesYear && matchesSearch;
		});
	}, [activeGroup, activeProvider, activeYear, dataset.certifications, searchValue]);

	const featuredCertifications = useMemo(
		() => filteredCertifications.filter((item) => item.featured),
		[filteredCertifications],
	);

	const certificationsByCategory = useMemo(() => {
		return dataset.categories.map((category) => ({
			category,
			items: filteredCertifications.filter((item) => item.category === category),
		}));
	}, [dataset.categories, filteredCertifications]);

	const providerSummaries = useMemo(() => {
		return providers.map((provider) => {
			const providerRecords = dataset.certifications.filter((item) => item.provider === provider);
			const categories = Array.from(new Set(providerRecords.map((item) => item.category)));

			return {
				provider,
				totalCertifications: providerRecords.length,
				categories,
			};
		});
	}, [dataset.certifications, providers]);

	const metrics = useMemo<CertificationMetric[]>(() => {
		const aiCount = dataset.certifications.filter((item) => belongsToGroup(item, "AI")).length;
		const cloudCount = dataset.certifications.filter((item) => belongsToGroup(item, "Cloud")).length;
		const platformCount = dataset.certifications.filter((item) => belongsToGroup(item, "Platform")).length;
		const devopsSreCount = dataset.certifications.filter((item) => belongsToGroup(item, "SRE")).length;
		const pmCount = dataset.certifications.filter((item) => belongsToGroup(item, "PM")).length;
		const professionalCount = dataset.certifications.filter((item) => belongsToGroup(item, "Professional")).length;
		const badgeCount = dataset.certifications.filter((item) => item.badge).length;
		const learningHours = getLifetimeLearningHours(dataset.certifications);

		return [
			{
				id: "total-certifications",
				title: "Total Certifications",
				description: "Total records in the certification and credential repository.",
				value: dataset.certifications.length,
				icon: "award",
				href: "#certification-dashboard",
			},
			{
				id: "ai-generative-ai",
				title: "AI & Generative AI",
				description: "AI, LLMOps, and generative AI credential tracks.",
				value: aiCount,
				icon: "brain",
				href: "#featured-certifications",
			},
			{
				id: "cloud-certifications",
				title: "Cloud Certifications",
				description: "Cloud certification pathways and provider-aligned records.",
				value: cloudCount,
				icon: "cloud",
				href: "#provider-dashboard",
			},
			{
				id: "platform-engineering",
				title: "Platform Engineering",
				description: "Platform and architecture-aligned certification evidence.",
				value: platformCount,
				icon: "server",
				href: "#certification-dashboard",
			},
			{
				id: "devsecops-sre",
				title: "DevSecOps / SRE",
				description: "Operational reliability and service maturity credential coverage.",
				value: devopsSreCount,
				icon: "gauge",
				href: "#certification-dashboard",
			},
			{
				id: "project-management",
				title: "Project Management",
				description: "Project and delivery governance credentials.",
				value: pmCount,
				icon: "briefcase",
				href: "#certification-dashboard",
			},
			{
				id: "professional-credentials",
				title: "Professional Credentials",
				description: "Professional standing and membership credentials.",
				value: professionalCount,
				icon: "credential",
				href: "#executive-summary",
			},
			{
				id: "digital-badges",
				title: "Digital Badges",
				description: "Digital badge and verifiable learning credentials.",
				value: badgeCount,
				icon: "badges",
				href: "#digital-badges",
			},
			{
				id: "active-providers",
				title: "Active Learning Providers",
				description: "Unique credential issuers represented in records.",
				value: providers.length,
				icon: "provider",
				href: "#provider-dashboard",
			},
			{
				id: "lifetime-learning-hours",
				title: "Lifetime Learning Hours",
				description: "Aggregate learning hours from credential records when available.",
				value: learningHours,
				icon: "learning",
				href: "#learning-journey",
			},
		];
	}, [dataset.certifications, providers.length]);

	return (
		<div className="space-y-8 sm:space-y-10">
			<section id="executive-dashboard" aria-label="Executive certification metrics" className="space-y-5">
				<CertificationDashboard metrics={metrics} />
			</section>

			<section id="executive-summary" aria-label="Executive summary" className="space-y-4">
				<Card className="space-y-5 p-6 sm:p-7">
					<SectionTitle title={dataset.summary.title} description={dataset.summary.description} />
					<div className="flex flex-wrap gap-2">
						{dataset.summary.chips.map((chip) => (
							<Badge key={chip} className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
								{chip}
							</Badge>
						))}
					</div>
				</Card>
			</section>

			<section id="filters" aria-label="Certification filters" className="space-y-4">
				<CertificationFilters
					groups={[...filterGroups]}
					activeGroup={activeGroup}
					onGroupChange={setActiveGroup}
					providers={providers}
					activeProvider={activeProvider}
					onProviderChange={setActiveProvider}
					years={years}
					activeYear={activeYear}
					onYearChange={setActiveYear}
				/>
				<CertificationSearch value={searchValue} onChange={setSearchValue} />
			</section>

			<section id="featured-certifications" aria-label="Featured certifications" className="space-y-5">
				<SectionTitle
					eyebrow="Featured"
					title="Featured Certifications"
					description="Highlighted credential records mapped to current enterprise technology focus areas."
				/>
				<div className="grid gap-4 lg:grid-cols-2">
					{featuredCertifications.map((item) => (
						<FeaturedCertification key={item.id} certification={item} />
					))}
				</div>
			</section>

			<section id="certification-dashboard" aria-label="Certification dashboard by category" className="space-y-6">
				<SectionTitle
					eyebrow="Certification Dashboard"
					title="Certification Categories"
					description="Category-level credential portfolio with expandable cards and dynamic record counts."
				/>

				<div className="space-y-6">
					{certificationsByCategory.map((categoryGroup) => (
						<article key={categoryGroup.category} className="space-y-4">
							<Card className="space-y-2 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{categoryGroup.category}</p>
								<p className="font-display text-3xl font-semibold tracking-tight text-foreground">{categoryGroup.items.length}</p>
								<p className="text-sm text-muted">Category Count</p>
							</Card>

							{categoryGroup.items.length ? (
								<div className="grid gap-4 lg:grid-cols-2">
									{categoryGroup.items.map((item) => (
										<CertificationCard key={item.id} certification={item} />
									))}
								</div>
							) : (
								<Card className="p-5">
									<p className="text-sm text-muted">No certification records currently mapped to this category in the verified dataset.</p>
								</Card>
							)}
						</article>
					))}
				</div>
			</section>

			<section id="digital-badges" aria-label="Digital badges" className="space-y-5">
				<SectionTitle
					eyebrow="Digital Credentials"
					title="Digital Badges"
					description="Verifiable badge records from the centralized credentials data model."
				/>
				<DigitalBadgeGrid badges={dataset.digitalBadges} />
			</section>

			<section id="certification-timeline" aria-label="Certification timeline" className="space-y-5">
				<SectionTitle
					eyebrow="Timeline"
					title="Certification Timeline"
					description="Chronological credential milestones with year-based filtering."
				/>
				<CertificationTimeline certifications={filteredCertifications} />
			</section>

			<section id="learning-journey" aria-label="Learning journey roadmap" className="space-y-5">
				<SectionTitle
					eyebrow="Learning Journey"
					title="Continuous Learning Roadmap"
					description="Foundation to enterprise AI progression visualized as an evolving professional development journey."
				/>
				<LearningJourney stages={dataset.learningJourney} />
			</section>

			<section id="provider-dashboard" aria-label="Certification providers" className="space-y-5">
				<SectionTitle
					eyebrow="Providers"
					title="Certification Providers"
					description="Issuer-level dashboard with category coverage and certification volume."
				/>
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{providerSummaries.map((provider) => (
						<ProviderCard key={provider.provider} {...provider} />
					))}
				</div>
			</section>

			<section id="skills-matrix" aria-label="Skills matrix" className="space-y-5">
				<SectionTitle
					eyebrow="Skill Coverage"
					title="Certification Skills Matrix"
					description="Skill-level map automatically derived from certification metadata and credential tags."
				/>
				<SkillsMatrix certifications={filteredCertifications} />
			</section>
		</div>
	);
}
