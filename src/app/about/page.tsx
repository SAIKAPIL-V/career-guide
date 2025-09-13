import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck, Target, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          About EduCareer Compass
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Empowering students to navigate their future with clarity and confidence.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://picsum.photos/seed/teamwork/800/600"
            alt="A diverse team collaborating"
            fill
            className="object-cover"
            data-ai-hint="diverse team collaboration"
          />
        </div>
        <div>
          <h2 className="font-headline text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            EduCareer Compass was born from a simple yet powerful idea: to bridge the awareness gap that prevents countless students from making informed decisions about their education and career. We noticed a decline in government college enrollment, not due to a lack of resources, but due to a lack of guidance. Students and parents were often confused about the value of a degree, the variety of career paths available, and how to choose a stream that aligns with their passion.
            <br /><br />
            We decided to build a digital guidance platform to serve as a one-stop, personalized advisor for every student, regardless of their background or location.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Mission & Vision</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-primary">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Target className="h-10 w-10 text-primary" />
                    <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        To empower every student with personalized, accessible, and reliable information, helping them to discover their potential, make informed academic choices, and successfully transition into a fulfilling career. We aim to make quality guidance a right, not a privilege.
                    </p>
                </CardContent>
            </Card>
             <Card className="border-l-4 border-accent">
                <CardHeader className="flex flex-row items-center gap-4">
                    <BookOpenCheck className="h-10 w-10 text-accent" />
                    <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        To build a future where every student has the clarity and confidence to pursue their dreams. We envision a world where government colleges are recognized as vibrant hubs for building successful careers, and no student is left behind due to a lack of guidance.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>

    </div>
  );
}
