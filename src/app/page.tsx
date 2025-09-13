import HeroSlider from '@/components/home/hero-slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase, School, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'AI-Powered Assessments',
    description: 'Take short, insightful quizzes to discover your strengths and interests, and get personalized course and career recommendations.',
  },
  {
    icon: <School className="h-10 w-10 text-primary" />,
    title: 'College & Course Directory',
    description: 'Explore a detailed directory of government colleges, the courses they offer, and what each course can lead to.',
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: 'Career Path Mapping',
    description: 'Visualize your journey from your chosen course to potential jobs, further studies, and long-term career growth.',
  },
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Finding your future is as easy as 1-2-3.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary text-3xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Take the Assessment</h3>
              <p className="text-muted-foreground">Answer a few simple questions to help us understand you better.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary text-3xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Get Your Results</h3>
              <p className="text-muted-foreground">Receive instant, AI-driven recommendations for courses and careers.</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary text-3xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Explore Your Path</h3>
              <p className="text-muted-foreground">Dive deep into career maps, college details, and future opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">A Compass for Your Career Journey</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make confident decisions about your education and future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Discover Your Future?</h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Take the first step towards a fulfilling career. Our personalized assessment is free, quick, and insightful.
          </p>
          <Button size="lg" className="mt-8 bg-background text-primary hover:bg-background/90 group" asChild>
            <Link href="/assessment">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}