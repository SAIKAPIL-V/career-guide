import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function CareersPage() {
  const stages = [
    {
      title: '10th Completed',
      href: '/careers/after-10th',
    },
    {
      title: '12th Completed',
      href: '/careers/after-12th',
    },
    {
      title: 'Degree Completed',
      href: '/careers/after-degree',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Build Your Career Roadmap
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Start by selecting your current educational stage to get a personalized, AI-generated plan for your future.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">What is your current educational stage?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-center gap-4">
          {stages.map((stage) => (
            <Button asChild key={stage.title} size="lg" className="flex-1">
              <Link href={stage.href}>
                {stage.title}
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
