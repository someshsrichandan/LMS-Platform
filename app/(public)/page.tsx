"use client";

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FeatureCard from "./_components/FeatureCard";
import { auth } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  const features = [
    {
      emoji: "📚",
      title: "Learn Anytime",
      description: "Access a vast library of courses at your convenience, from anywhere in the world.",
    },
    {
      emoji: "🚀",
      title: "Grow Your Skills",
      description: "Master new skills with expertly crafted courses designed for all levels.",
    },
    {
      emoji: "👩‍🏫",
      title: "Expert Instructors",
      description: "Learn from industry leaders and professionals with real-world experience.",
    },
    {
      emoji: "🏆",
      title: "Earn Certificates",
      description: "Showcase your achievements with shareable certificates of completion.",
    },
  ];

  return (
    <div className="min-h-screen font-serif bg-background">
      {/* Hero Section */}
      <section className="container px-6 py-24 mx-auto text-center">
        <HoverCard>
          <HoverCardTrigger>
            <h2 className="mb-6 font-sans text-4xl font-extrabold text-foreground md:text-6xl">
              Welcome to <span className="text-primary">LMS Platform</span>
            </h2>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm text-muted-foreground">
            Your gateway to limitless learning opportunities.
          </HoverCardContent>
        </HoverCard>
        <p className="max-w-3xl mx-auto mb-8 text-lg text-muted-foreground md:text-xl">
          Discover thousands of courses designed to elevate your skills with our state-of-the-art Learning Management System.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="transition-transform transform bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 rounded-[--radius] shadow-md font-sans"
            onClick={() => router.push("/explore")}
          >
            Explore Courses
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="transition-transform transform border-border text-primary hover:bg-accent hover:text-accent-foreground hover:scale-105 rounded-[--radius] shadow-md font-sans"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-6 py-20 mx-auto">
        <h3 className="mb-12 font-sans text-3xl font-bold text-center text-foreground">
          Why Choose LMS Platform?
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container px-6 py-20 mx-auto text-center text-primary-foreground bg-primary rounded-[--radius] shadow-md">
        <h3 className="mb-4 font-sans text-3xl font-bold">
          Ready to Start Your Learning Journey?
        </h3>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Join thousands of learners on LMS Platform and unlock your potential today!
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="transition-transform transform bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 rounded-[--radius] shadow-md font-sans"
          onClick={() => router.push("/signup")}
        >
          Get Started
        </Button>
      </section>
    </div>
  );
}