import type React from "react";
import { Calendar, Upload, Users } from "lucide-react";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to create beautiful wacana galleries
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <FeatureCard
            icon={<Calendar className="h-12 w-12 text-primary" />}
            title="Wacana Scheduling"
            description="Plan and organize your wacanas with our intuitive scheduling system."
          />
          <FeatureCard
            icon={<Upload className="h-12 w-12 text-primary" />}
            title="Bulk Upload"
            description="Upload multiple photos at once with drag-and-drop simplicity."
          />
          <FeatureCard
            icon={<Users className="h-12 w-12 text-primary" />}
            title="Sharing Controls"
            description="Share galleries with specific people or make them public."
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  );
}
