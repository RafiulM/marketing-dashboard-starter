"use client";

import Image from "next/image";
import { Shield, Database, Zap, Code } from "lucide-react";
import { HeroAuthButtons } from "@/components/auth-buttons";
import { AuthButtons } from "@/components/auth-buttons";
import { ThemeToggle } from "@/components/theme-toggle";

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" role="presentation" aria-hidden="true">
    <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse will-change-transform" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000 will-change-transform" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 dark:from-cyan-600/10 dark:via-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl" />
  </div>
);

const HeroHeader = () => (
  <header className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
    <Image
      src="/codeguide-logo.png"
      alt="CodeGuide Logo"
      width={80}
      height={80}
      className="rounded-2xl sm:w-[90px] sm:h-[90px] shadow-lg"
      priority
    />
    <div className="text-center sm:text-left">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent font-parkinsans leading-tight">
        Codeguide
      </h1>
      <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/80 mt-2">
        Fullstack Starter
      </div>
    </div>
  </header>
);

const HeroContent = () => (
  <div className="space-y-10">
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/90 font-medium leading-relaxed">
        Ship faster with our modern TypeScript stack
      </p>
      
      <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
        Everything you need to build production-ready web applications: authentication, database, UI components, 
        and deployment-ready configuration. Start building instead of configuring.
      </p>
    </div>
    
    <HeroAuthButtons />
  </div>
);

const FeatureHighlight = ({ icon: Icon, title, color }: { icon: any; title: string; color: string }) => (
  <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
    <Icon className={`w-8 h-8 ${color} mb-2`} aria-hidden="true" />
    <div className="text-sm font-semibold text-center">{title}</div>
  </div>
);

const KeyFeatures = () => {
  const features = [
    { icon: Shield, title: "Secure Auth", color: "text-green-600 dark:text-green-400" },
    { icon: Database, title: "PostgreSQL", color: "text-blue-600 dark:text-blue-400" },
    { icon: Zap, title: "Fast Build", color: "text-yellow-600 dark:text-yellow-400" },
    { icon: Code, title: "TypeScript", color: "text-purple-600 dark:text-purple-400" },
  ];

  return (
    <section aria-labelledby="key-features-heading" className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
      <h2 id="key-features-heading" className="sr-only">Key Features</h2>
      {features.map((feature, index) => (
        <FeatureHighlight 
          key={index}
          icon={feature.icon}
          title={feature.title}
          color={feature.color}
        />
      ))}
    </section>
  );
};

const TopNavigation = () => (
  <nav className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10" aria-label="Top navigation">
    <div className="flex items-center gap-2 sm:gap-3">
      <AuthButtons />
      <ThemeToggle />
    </div>
  </nav>
);

export function HeroSection() {
  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center px-4"
      aria-labelledby="hero-heading"
    >
      <TopNavigation />
      <HeroBackground />
      
      <div className="text-center max-w-5xl mx-auto relative z-10 space-y-12">
        <div>
          <HeroHeader />
          <HeroContent />
        </div>
        <KeyFeatures />
      </div>
    </section>
  );
}