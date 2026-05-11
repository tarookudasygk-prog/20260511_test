import { notFound } from "next/navigation";
import { COMPANIES, getCompany } from "@/data/companies";
import { CompanyDetailView } from "@/components/CompanyDetailView";

export function generateStaticParams() {
  return COMPANIES.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const c = getCompany(params.id);
  if (!c) return { title: "Not Found" };
  return {
    title: `${c.name} | IP企業ストラテジー図鑑`,
    description: c.positioning,
  };
}

export default function CompanyPage({ params }: { params: { id: string } }) {
  const company = getCompany(params.id);
  if (!company) return notFound();
  return <CompanyDetailView company={company} total={COMPANIES.length} />;
}
