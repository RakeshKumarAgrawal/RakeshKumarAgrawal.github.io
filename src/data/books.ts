export type BookStatus = "Published" | "Planned";

export type BookConnectionType =
  | "Research Papers"
  | "Frameworks"
  | "Datasets"
  | "Projects"
  | "Newsletter Editions";

export type BookConnection = {
  type: BookConnectionType;
  label: string;
  href: string;
};

export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  series: string;
  volume: string;
  publicationDate: string;
  publisher: string;
  status: BookStatus;
  coverImage: string;
  description: string;
  topics: string[];
  amazonUrl: string;
  featured: boolean;
  connections?: BookConnection[];
};

export const books: Book[] = [
  {
    id: "from-zero-to-ai",
    title: "From Zero to AI",
    subtitle:
      "An Easy Beginner's Guide to Artificial Intelligence, Machine Learning, Generative AI, ChatGPT, AI Agents, and the Future of Intelligent Systems",
    series: "The Enterprise AI Learning Series",
    volume: "Book 1",
    publicationDate: "2026-07-31",
    publisher: "Amazon Kindle Direct Publishing",
    status: "Published",
    coverImage: "/images/books/from-zero-to-ai.jpg",
    description:
      "A beginner-friendly guide to Artificial Intelligence, Machine Learning, Generative AI, ChatGPT, AI Agents, and modern intelligent systems, supported by practical explanations and real-world examples.",
    topics: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "ChatGPT",
      "AI Agents",
      "Prompt Engineering",
      "Responsible AI",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0HCCR1V4H",
    featured: true,
    connections: [
      { type: "Research Papers", label: "Research Publications", href: "/publications" },
      { type: "Frameworks", label: "Enterprise AI Frameworks", href: "/frameworks" },
      { type: "Projects", label: "Enterprise AI Projects", href: "/projects" },
      { type: "Newsletter Editions", label: "Enterprise Intelligence Lab Newsletter", href: "/publications" },
    ],
  },
  {
    id: "bio-quantum-energy-brain",
    title: "BIO-Quantum Energy Brain (BQEB)",
    subtitle: "A Unified Intelligence Framework for Future Energy Systems",
    series: "BIO-Quantum Intelligence Research Series",
    volume: "Book 1",
    publicationDate: "2026-08-07",
    publisher: "Independently published",
    status: "Published",
    coverImage: "/images/books/book-2.jpg",
    description:
      "A unified intelligence framework for next-generation energy systems, integrating artificial intelligence, quantum-inspired computing, optimization, and intelligent decision architectures.",
    topics: [
      "Energy Intelligence",
      "Smart Grids",
      "Renewable Energy",
      "Energy Forecasting",
      "Quantum-Inspired Optimization",
      "Autonomous Energy Systems",
    ],
    amazonUrl: "https://www.amazon.com/dp/B0HDBWFNP4",
    featured: true,
    connections: [
      { type: "Research Papers", label: "Energy Intelligence Research", href: "/publications" },
      { type: "Frameworks", label: "Research Frameworks", href: "/frameworks" },
      { type: "Datasets", label: "BQEB Research Datasets", href: "/datasets" },
      { type: "Projects", label: "BQEB Research Projects", href: "/projects" },
      { type: "Newsletter Editions", label: "Enterprise Intelligence Lab Newsletter", href: "/publications" },
    ],
  },
];

export const publishedBooks = books
  .filter((book) => book.status === "Published")
  .sort((left, right) => Date.parse(right.publicationDate) - Date.parse(left.publicationDate));

export const latestPublishedBook = publishedBooks[0];

const uniqueValues = (values: string[]) => [...new Set(values)];

const publicationYears = publishedBooks.map((book) => new Date(`${book.publicationDate}T00:00:00`).getUTCFullYear());

export const bookPortfolioMetrics = [
  { label: "Published Books", value: String(books.length) },
  { label: "Book Series", value: String(uniqueValues(publishedBooks.map((book) => book.series)).length) },
  { label: "Current Volumes", value: String(uniqueValues(publishedBooks.map((book) => `${book.series}:${book.volume}`)).length) },
  { label: "Research Topics Covered", value: String(uniqueValues(publishedBooks.flatMap((book) => book.topics)).length) },
  { label: "Publisher", value: uniqueValues(publishedBooks.map((book) => book.publisher)).join(" / ") },
  {
    label: "Years Publishing",
    value: publicationYears.length
      ? String(Math.max(...publicationYears) - Math.min(...publicationYears) + 1)
      : "0",
  },
];

export const formatBookTitle = (book: Book) =>
  book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;

export const formatPublicationDate = (publicationDate: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${publicationDate}T00:00:00`));