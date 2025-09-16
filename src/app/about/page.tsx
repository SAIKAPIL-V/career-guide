'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck, Target, Users } from 'lucide-react';
import Image from 'next/image';
import EmblemLogo from '@/components/layout/emblem-logo';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          About CareerCompass
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          An initiative by the Government of Jammu and Kashmir, made for every student in India.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://picsum.photos/seed/about-us-students/800/600"
            alt="Students planning their future"
            fill
            className="object-cover"
            data-ai-hint="students technology"
          />
        </div>
        <div>
          <h2 className="font-headline text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            CareerCompass was established by the Government of Jammu and Kashmir to address the critical need for career guidance. We aim to bridge the information gap, making students and parents aware of the diverse educational and career opportunities available.
            <br /><br />
            Our mission is to provide a one-stop, personalized digital advisor for every student, ensuring they can make informed decisions that align with their passions, no matter where they are from.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Mission &amp; Vision</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-primary">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Target className="h-10 w-10 text-primary" />
                    <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        To empower every student with personalized, accessible, and reliable information, helping them to discover their potential, make informed academic choices, and successfully transition into a fulfilling career.
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
                        To build a future where every student has the clarity and confidence to pursue their dreams, contributing to the growth and prosperity of the nation.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>

    </div>
  );
}
