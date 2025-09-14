import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function AssessmentPage() {
  const stages = [
    {
      title: 'After 10th',
      description: 'Explore streams like Science, Commerce, and Arts and see what they lead to.',
      href: '/careers/after-10th',
    },
    {
      title: 'After 12th',
      description: 'Discover degree courses and career opportunities based on your 12th grade stream.',
      href: '/careers/after-12th',
    },
    {
      title: 'After Degree',
      description: 'Find paths for further studies, specialized jobs, or entrepreneurship after your graduation.',
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stages.map((stage) => (
           <Link href={stage.href} key={stage.title} className="group block">
            <Card className="h-full shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-4 rounded-lg">
                            <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-headline">{stage.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">{stage.description}</p>
                    <Button variant="link" className="p-0 font-bold text-primary">
                        Explore Paths
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>
           </Link>
        ))}
      </div>
    </div>
  );
}
