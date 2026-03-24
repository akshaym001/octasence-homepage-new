import { notFound } from 'next/navigation';

import { caseStudies } from '../data/caseStudies';
import CaseStudyDetail from './CaseStudyDetail';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ id: cs.id }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cs = caseStudies.find((c) => c.id === id);
  if (!cs) notFound();
  return <CaseStudyDetail cs={cs} />;
}
