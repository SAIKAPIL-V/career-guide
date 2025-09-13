import HeroSlider from '@/components/home/hero-slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Compass,
  GraduationCap,
  Map,
  PenSquare,
  Sparkles,
  ArrowRight,
  CalendarDays,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const howItWorks = [
    {
      icon: <PenSquare className="h-10 w-10 text-primary" />,
      title: 'Take the Assessment',
      description: 'Answer a few simple questions to help us understand your interests and strengths.',
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: 'Get Personalized Insights',
      description: 'Our AI provides tailored course and career recommendations just for you.',
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: 'Explore Your Future',
      description: 'Discover detailed career paths, colleges, and the steps to achieve your goals.',
    },
  ];

  const features = [
    {
      icon: <Compass className="h-8 w-8 text-accent" />,
      title: 'Aptitude & Interest Matching',
      description: 'Find the perfect stream (Arts, Science, Commerce) based on your unique profile.',
    },
    {
      icon: <Map className="h-8 w-8 text-accent" />,
      title: 'Course-to-Career Mapper',
      description: 'Visualize your journey from a degree to your dream job with our interactive path maps.',
    },
    {
      icon: <CalendarDays className="h-8 w-8 text-accent" />,
      title: 'Local College Directory',
      description: 'Explore nearby government colleges, courses offered, and admission timelines.',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="w-full">
        <HeroSlider />
      </section>

      <section id="how-it-works" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              Your Journey to Success in 3 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We make career and education planning clear and straightforward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {step.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Unlock Your Potential
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our powerful tools are designed to guide you at every step.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background border-l-4 border-accent hover:bg-accent/5 transition-colors duration-300">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-headline text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Ready to Find Your Path?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Take our free assessment today and get the clarity you need to make confident decisions about your future.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 text-lg font-bold group">
            <Link href="/assessment">
              Start Your Free Assessment <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
