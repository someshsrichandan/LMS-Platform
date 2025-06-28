import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

export default function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      <Card className="transition-shadow duration-300 border-border shadow-md bg-card rounded-[--radius]">
        <CardHeader>
          <div className="mb-2 text-4xl">{emoji}</div>
          <CardTitle className="font-sans text-lg font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}