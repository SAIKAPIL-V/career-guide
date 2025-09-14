import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Briefcase, Building, Paintbrush } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const careerCategories = [
    {
      icon: <Compass className="h-10 w-10 text-primary" />,
      title: 'Engineering & Technology',
      description: 'Explore careers in software, mechanical, civil, and other engineering fields.',
      href: '/careers/engineering',
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: 'Business & Management',
      description: 'Discover paths in finance, marketing, human resources, and entrepreneurship.',
      href: '/careers/business',
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: 'Healthcare & Medicine',
      description: 'Learn about roles for doctors, nurses, pharmacists, and researchers.',
      href: '/careers/healthcare',
    },
     {
      icon: <Paintbrush className="h-10 w-10 text-primary" />,
      title: 'Arts & Humanities',
      description: 'Discover careers in design, writing, journalism, and social sciences.',
      href: '/careers/arts',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Explore Career Paths
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Find the right career that aligns with your passion and skills.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {careerCategories.map((category, index) => (
          <Link href={category.href} key={index}>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  {category.icon}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-headline text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
