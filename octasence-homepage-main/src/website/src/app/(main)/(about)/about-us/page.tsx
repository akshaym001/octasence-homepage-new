'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import mainConfig from '@/configs/mainConfigs';
import PitchDeckDownload from '@/components/layouts/PitchDeckDownload';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';

// ============================================================
// DATA
// ============================================================

type Founder = {
  name: string;
  role: string;
  tagline: string;
  imageSrc: string;
};

const FOUNDERS: Founder[] = [
  {
    name: 'Shivaraj Choutagi',
    role: 'Founder & CEO',
    tagline:
      'Mining and AI leader turning field reality into predictive infrastructure intelligence.',
    imageSrc: '/assets/images/Shivraj.jpeg',
  },
  {
    name: 'Harsh Vardhan',
    role: 'Co-Founder & CTO',
    tagline:
      'Twenty years shipping agentic platforms—from PropTech to SHM—for mission-critical systems.',
    imageSrc: '/assets/images/WhatsApp Image 2026-03-23 at 17.20.20.jpeg',
  },
  {
    name: 'Wolfgang Staufer',
    role: 'Co-Founder · Business Development',
    tagline:
      'Scales deep-tech ventures globally—engineering rigor with board-level commercial execution.',
    imageSrc: '/assets/images/wolfgang.jpeg',
  },
  {
    name: 'Vasiliy Bezlyudnyy',
    role: 'Co-Founder · Product',
    tagline:
      'Product and analytics lead: from customer truth to KPIs, dashboards, and shipped features.',
    imageSrc: '/assets/images/vesely.png',
  },
];

type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  tagline: string;
  initials: string;
};

const TEAM: TeamMember[] = [
  {
    name: 'Sandeep Vissapragada',
    role: 'Strategy & partnerships',
    linkedin:
      'https://www.linkedin.com/in/sandeep-vissapragada-10b09b24a',
    tagline:
      'Aligns enterprise programs with Octasence roadmaps so deployments land on time.',
    initials: 'SV',
  },
  {
    name: 'Hovarthan S.',
    role: 'Software engineering',
    linkedin:
      'https://www.linkedin.com/in/hovarthan-s-06114b281',
    tagline:
      'Builds resilient ingestion and APIs that keep field data trustworthy at scale.',
    initials: 'HS',
  },
  {
    name: 'Akshay Mali',
    role: 'Product engineering',
    linkedin: 'https://www.linkedin.com/in/akshay-mali-333129246/',
    tagline:
      'Connects UX and telemetry so operators see risk—not noise—on every screen.',
    initials: 'AM',
  },
  {
    name: 'Prashant Paliwal',
    role: 'Operations',
    linkedin:
      'https://www.linkedin.com/in/prashant-paliwal-39914726a',
    tagline:
      'Keeps delivery, vendors, and customer success moving as one rhythm.',
    initials: 'PP',
  },
  {
    name: 'Devanshi Jaiswal',
    role: 'Design & experience',
    linkedin:
      'https://www.linkedin.com/in/devanshi-jaiswal-b83774217',
    tagline:
      'Shapes interfaces and narratives so complex SHM feels obvious to real users.',
    initials: 'DJ',
  },
];

// ============================================================
// COMPONENTS
// ============================================================

function TeamAvatar({ initials }: { initials: string }) {
  return (
    <div className="flex aspect-square w-full max-w-[160px] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/35 to-sky-500/20 text-xl font-semibold text-white/90">
      {initials}
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b1a] text-slate-100">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(ellipse_70%_50%_at_100%_15%,rgba(99,102,241,0.14),transparent_45%),linear-gradient(180deg,#070b1a_0%,#0a1024_50%,#080c18_100%)]">

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className={`${mainConfig.containerClass} px-4 py-20 md:py-28`}>
            <p className="octa-pill mb-6">About Octasence</p>
            <h1 className="octa-heading text-4xl md:text-5xl lg:text-6xl max-w-4xl">
              Agentic intelligence for the world's critical infrastructure
            </h1>
            <p className="octa-lead mt-6 max-w-3xl text-lg md:text-xl text-slate-300">
              Octasence builds AI-driven structural health monitoring and
              geotechnical intelligence for predictive risk orchestration.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-indigo-600 text-white">
                <Link href="/contact">Talk to us</Link>
              </Button>

              <Button asChild variant="outline" size="lg"
                className="rounded-full border-white/20 bg-white/5 text-white">
                <Link href="/careers">Careers</Link>
              </Button>
            </div>
          </div>
        </section>

        <PitchDeckDownload href="/assets/OctaSence_Investor_Deck_2026.pdf" />

        {/* FOUNDERS */}
        <section className={`${mainConfig.containerClass} px-4 py-16 md:py-24`}>
          <h2 className="text-3xl md:text-4xl mb-8">Founders</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="p-6 bg-white/[0.03] rounded-2xl">
                <Image src={f.imageSrc} alt={f.name} width={300} height={400} className="rounded-xl mb-4"/>
                <h3 className="text-xl">{f.name}</h3>
                <p className="text-blue-400 text-sm">{f.role}</p>
                <p className="text-slate-300 mt-2 text-sm">{f.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="py-16 md:py-24 border-y border-white/10">
          <div className={`${mainConfig.containerClass} px-4`}>
            <h2 className="text-3xl md:text-4xl mb-8">Team</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m) => (
                <div key={m.name} className="p-6 bg-[#0a1024] rounded-2xl">
                  <TeamAvatar initials={m.initials} />
                  <h3 className="mt-4">{m.name}</h3>
                  <p className="text-xs text-slate-400">{m.role}</p>
                  <p className="text-sm mt-2 text-slate-300">{m.tagline}</p>
                  <a href={m.linkedin} className="text-blue-400 text-sm mt-3 block">
                    LinkedIn →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default AboutPage;