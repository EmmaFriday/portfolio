import { Header } from "@/components/layout/Header";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { BeyondPortfolio } from "@/components/sections/BeyondPortfolio";
import { WhatIStandFor } from "@/components/sections/WhatIStandFor";
import { TheRightFit } from "@/components/sections/TheRightFit";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <ThemeToggle />
      <main style={{ paddingTop: "var(--header-height)" }}>
        <Hero />
        <WhatIDo />
        <ImpactMetrics />
        <CaseStudies />
        <BeyondPortfolio />
        <WhatIStandFor />
        <TheRightFit />
        <Contact />
      </main>
    </>
  );
}
